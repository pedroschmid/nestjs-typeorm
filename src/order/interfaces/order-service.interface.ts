import { OrderEntity } from 'src/order/order.entity';
import { FindAllOrdersResponseDTO } from 'src/order/dtos/find-all-orders-response.dto';
import { StoreOrderDTO } from 'src/order/dtos/store-order.dto';
import { UpdateOrderDTO } from 'src/order/dtos/update-order.dto';
import { ChangeOrderStatusDTO } from 'src/order/dtos/change-order-status.dto';

export interface IOrderService {
  findAll(): Promise<FindAllOrdersResponseDTO>;
  findOne(id: string): Promise<OrderEntity>;
  store(storeOrderDTO: StoreOrderDTO): Promise<OrderEntity>;
  update(id: string, updateOrderDTO: UpdateOrderDTO): Promise<OrderEntity>;
  remove(id: string): Promise<OrderEntity>;
  changeStatus(
    id: string,
    changeOrderStatusDTO: ChangeOrderStatusDTO,
  ): Promise<OrderEntity>;
}
