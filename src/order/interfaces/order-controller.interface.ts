import { ResponseJsonDTO } from 'src/base/dtos/response-json.dto';

import { StoreOrderDTO } from 'src/order/dtos/store-order.dto';
import { UpdateOrderDTO } from 'src/order/dtos/update-order.dto';
import { ChangeOrderStatusDTO } from 'src/order/dtos/change-order-status.dto';

export interface IOrderController {
  findAll(): Promise<ResponseJsonDTO>;
  findOne(id: string): Promise<ResponseJsonDTO>;
  store(storeOrderDTO: StoreOrderDTO): Promise<ResponseJsonDTO>;
  update(id: string, updateOrderDTO: UpdateOrderDTO): Promise<ResponseJsonDTO>;
  remove(id: string): Promise<ResponseJsonDTO>;
  changeStatus(
    id: string,
    changeOrderStatusDTO: ChangeOrderStatusDTO,
  ): Promise<ResponseJsonDTO>;
}
