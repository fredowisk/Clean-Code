import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

class OrderRepositoryMemory implements OrderRepository {
  #orders: Order[];
  constructor() {
    this.#orders = [];
  }

  async findAll(): Promise<{ code: string; total: number }[]> {
    const mappedOrder: { code: string; total: number }[] = this.#orders.map(
      (order) => {
        return { code: order.getCode(), total: order.getTotal() };
      }
    );
    return Promise.resolve(mappedOrder);
  }

  async findByCode(code: string): Promise<Order | undefined> {
    const order = this.#orders.find((order) => order.getCode() === code);
    if (!order) return undefined;

    return Promise.resolve(order);
  }

  async clear(): Promise<void> {
    this.#orders = [];
  }

  save(order: Order): Promise<void> {
    this.#orders.push(order);
    console.log(this.#orders);
    return Promise.resolve();
  }

  count(): Promise<number> {
    return Promise.resolve(this.#orders.length);
  }
}

export default OrderRepositoryMemory;
