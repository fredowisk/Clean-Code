import OrderDAO from "../../application/dao/OrderDAO";
import GetOrder from "../../application/usecase/GetOrder/GetOrder";
import GetOrders from "../../application/usecase/GetOrders/GetOrders";
import SimulateFreight from "../../application/usecase/SimulateFreight/SimulateFreight";
import ValidateCoupon from "../../application/usecase/ValidateCoupon/ValidateCoupon";
import FreightCalculator from "../../domain/entity/FreightCalculator";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import Broker from "../broker/Broker";
import GetOrderController from "../controller/GetOrderController";
import GetOrdersController from "../controller/GetOrdersController";
import PlaceOrderController from "../controller/PlaceOrderController";
import Connection from "../database/Connection";
import PgPromiseConnectionAdapter from "../database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../repository/database/OrderRepositoryDatabase";
import Http from "./Http";

class RouteConfig {
  constructor(
    http: Http,
    repositoryFactory: RepositoryFactory,
    orderDAO: OrderDAO,
    broker: Broker
  ) {
    http.on("/orders", "post", async (params: any, body: any) => {
      const placeOrderController = new PlaceOrderController(
        repositoryFactory,
        broker
      );
      return placeOrderController.execute(params, body);
    });

    http.on("/simulateFreight", "post", async (params: any, body: any) => {
      const simulateFreight = new SimulateFreight(
        new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()),
        new FreightCalculator()
      );
      const input = body;
      return simulateFreight.execute(input);
    });

    http.on("/validateCoupon", "post", async (params: any, body: any) => {
      const couponValidator = new ValidateCoupon(
        new CouponRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
      );

      const input = body;
      return couponValidator.execute(input.code);
    });

    http.on("/getOrder", "get", async (params: any, body: any) => {
      const getOrder = new GetOrder(
        new OrderRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
      );

      const input = body;
      return getOrder.execute(input.code);
    });

    http.on("/getOrders", "get", async (params: any, body: any) => {
      const getOrdersController = new GetOrdersController(orderDAO);

      return getOrdersController.execute();
    });

    http.on("/getOrders/:code", "get", async (params: any, body: any) => {
      const getOrderController = new GetOrderController(orderDAO);

      return getOrderController.execute(params, body);
    });
  }
}

export default RouteConfig;
