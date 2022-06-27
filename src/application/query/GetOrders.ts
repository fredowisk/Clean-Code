import OrderDAO from "../dao/OrderDAO";
import GetOrdersOutput from "./GetOrdersOutput";

class GetOrders {
  constructor(readonly orderDAO: OrderDAO) {}

  async execute(): Promise<GetOrdersOutput> {
    const orders = await this.orderDAO.findAll();

    const getOrdersOutput = new GetOrdersOutput(orders);
    return getOrdersOutput;
  }
}

export default GetOrders;
