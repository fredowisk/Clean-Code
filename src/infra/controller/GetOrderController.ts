import OrderDAO from "../../application/dao/OrderDAO";
import GetOrder from "../../application/query/GetOrder";

class GetOrderController {
  constructor(readonly orderDAO: OrderDAO) {}

  async execute(params: any, body: any) {
    const getOrder = new GetOrder(this.orderDAO);

    return getOrder.execute(params.code);
  }
}

export default GetOrderController;
