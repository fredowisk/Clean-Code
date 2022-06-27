import DomainEvent from "../../infra/broker/DomainEvent";
import Order from "../entity/Order";

class OrderPlaced implements DomainEvent {
  name: string;
  constructor(readonly order: Order) {
    this.name = "OrderPlaced";
  }
}

export default OrderPlaced;
