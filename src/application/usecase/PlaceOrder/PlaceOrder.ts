import FreightCalculator from "../../../domain/entity/FreightCalculator";
import Order from "../../../domain/entity/Order";
import StockEntry from "../../../domain/entity/StockEntry";
import OrderPlaced from "../../../domain/event/OrderPlaced";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import CouponRepository from "../../../domain/repository/CouponRepository";
import ItemRepository from "../../../domain/repository/ItemRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Broker from "../../../infra/broker/Broker";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";

class PlaceOrder {
  itemRepository: ItemRepository;
  couponRepository: CouponRepository;
  orderRepository: OrderRepository;

  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.itemRepository = repositoryFactory.createItemRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order(
      input.cpf,
      input.date,
      new FreightCalculator(),
      sequence
    );

    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      if (!item) throw new Error("Item not found!");
      order.addItem(item, orderItem.quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.findByCode(input.coupon);
      coupon && order.addCoupon(coupon);
    }
    const output = new PlaceOrderOutput(order.getCode(), order.getTotal());

    await this.orderRepository.save(order);
    this.broker.publish(new OrderPlaced(order));
    return output;
  }
}

export default PlaceOrder;
