import OrderDAO from "../dao/OrderDAO";
import GetOrderOutput from "./GetOrderOutput";

class GetOrder {
  constructor(readonly orderDAO: OrderDAO) {}

  async execute(code: string): Promise<GetOrderOutput> {
    const [order] = await this.orderDAO.get(code);

    const getOrderOutput = new GetOrderOutput(order.code, order.total);
    return getOrderOutput;
  }
}

export default GetOrder;
