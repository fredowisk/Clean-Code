import Coupon from "../../../domain/entity/Coupon";
import FreightCalculator from "../../../domain/entity/FreightCalculator";
import Item from "../../../domain/entity/Item";
import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async clear(): Promise<void> {
    Promise.all([
      this.connection.query("delete from ccca.order_item", []),
      this.connection.query("delete from ccca.order", []),
    ]);
  }

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(
      "insert into ccca.order (coupon,code,cpf,issue_date,freight,total) values ($1,$2,$3,$4,$5,$6) returning *",
      [
        order.getCoupon()?.code,
        order.getCode(),
        order.getCpf(),
        order.date,
        order.getFreight(),
        order.getTotalValue(),
      ]
    );

    for (const orderItem of order.getOrderItems()) {
      await this.connection.query(
        "insert into ccca.order_item (id_item, id_order, price, quantity) values ($1, $2, $3, $4)",
        [
          orderItem.idItem,
          orderData.id_order,
          orderItem.price,
          orderItem.quantity,
        ]
      );
    }
  }

  async count(): Promise<number> {
    const [totalOrders] = await this.connection.query(
      "select count(*)::int as count from ccca.order",
      []
    );
    return totalOrders.count;
  }

  async findByCode(code: string): Promise<Order | undefined> {
    const [order] = await this.connection.query(
      "select * from ccca.order where code = $1",
      [code]
    );

    if (!order) return undefined;

    const orderData = new Order(
      order.cpf,
      order.issue_date,
      new FreightCalculator(),
      order.sequence
    );

    const orderItems = await this.connection.query(
      "select * from ccca.order_item where id_order = $1",
      [order.id_order]
    );

    for (const orderItem of orderItems) {
      const [item] = await this.connection.query(
        "select * from ccca.item where id_item = $1",
        orderItem.id_item
      );
      const itemData = new Item(
        item.id_item,
        item.category,
        item.description,
        parseFloat(orderItem.price),
        item.width,
        item.height,
        item.length,
        item.weight
      );

      orderData.addItem(itemData, orderItem.quantity);
    }

    if (order.coupon) {
      const [coupon] = await this.connection.query(
        "select * from ccca.coupon where code = $1",
        [order.coupon]
      );

      const couponData = new Coupon(
        coupon.code,
        coupon.percentage,
        coupon.expire_date
      );

      orderData.addCoupon(couponData);
    }

    return orderData;
  }

  async findAll(): Promise<{ code: string; total: number }[]> {
    const ordersList: { code: string; total: number }[] = [];
    const orders = await this.connection.query("select * from ccca.order", []);
    for (const order of orders) {
      const orderData = await this.findByCode(order.code);
      if (orderData)
        ordersList.push({
          code: orderData.getCode(),
          total: orderData.getTotal(),
        });
    }

    return ordersList;
  }
}

export default OrderRepositoryDatabase;
