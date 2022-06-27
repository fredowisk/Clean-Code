import OrderDAO from "../../application/dao/OrderDAO";
import GetOrders from "../../application/query/GetOrders";

class GetOrdersController {
  constructor(readonly orderDAO: OrderDAO) {}

  async execute() {
    const getOrders = new GetOrders(this.orderDAO);

    return getOrders.execute();
  }
}

export default GetOrdersController;
