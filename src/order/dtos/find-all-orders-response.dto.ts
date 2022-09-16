import { OrderEntity } from 'src/order/order.entity';

export class FindAllOrdersResponseDTO {
  public total: number;
  public orders: Array<OrderEntity>;
}
