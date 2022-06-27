import PlaceOrder from "../../application/usecase/PlaceOrder/PlaceOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import Broker from "../broker/Broker";
import DatabaseRepositoryFactory from "../factory/DatabaseRepositoryFactory";

class PlaceOrderController {
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {}

  async execute(params: any, body: any) {
    const placeOrder = new PlaceOrder(this.repositoryFactory, this.broker);
    const input = body;
    input.date = new Date(body.date);

    return placeOrder.execute(input);
  }
}

export default PlaceOrderController;
