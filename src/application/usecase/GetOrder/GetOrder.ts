import OrderRepository from "../../../domain/repository/OrderRepository";
import GetOrderOutput from "./GetOrderOutput";

class GetOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(code: string): Promise<GetOrderOutput> {
    const order = await this.orderRepository.findByCode(code);
    if (!order) throw new Error("Order not found!");

    const getOrderOutput = new GetOrderOutput(code, order.getTotal());

    return getOrderOutput;
  }
}

export default GetOrder;
