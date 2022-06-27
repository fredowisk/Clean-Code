import OrderRepository from "../../../domain/repository/OrderRepository";
import GetOrdersOutput from "./GetOrdersOutput";

class GetOrders {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(): Promise<GetOrdersOutput> {
    const orders = await this.orderRepository.findAll();

    const output = new GetOrdersOutput(orders);

    return output;
  }
}

export default GetOrders;
