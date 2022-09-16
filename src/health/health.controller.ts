import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('/health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private database: TypeOrmHealthIndicator,
  ) {}

  @Get('/')
  @HealthCheck()
  public check() {
    return this.health.check([() => this.database.pingCheck('database')]);
  }
}
