import Order from "../entity/Order";

interface OrderRepository {
  save(order: Order): Promise<void>;
  count(): Promise<number>;
  clear(): Promise<void>;
  findByCode(code: string): Promise<Order | undefined>;
  findAll(): Promise<{ code: string; total: number }[]>;
}

export default OrderRepository;
