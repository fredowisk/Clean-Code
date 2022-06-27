import GetOrders from "../../../application/usecase/GetOrders/GetOrders";
import OrderRepository from "../../../domain/repository/OrderRepository";
import PgPromiseConnectionAdapter from "../../../infra/database/PgPromiseConnectionAdapter";
import OrderRepositoryDatabase from "../../../infra/repository/database/OrderRepositoryDatabase";
import OrderRepositoryMemory from "../../../infra/repository/memory/OrderRepositoryMemory";

let getOrders: GetOrders;
let orderRepository: OrderRepository;

beforeAll(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  orderRepository = new OrderRepositoryDatabase(connection);
  // orderRepository = new OrderRepositoryMemory();

  getOrders = new GetOrders(orderRepository);
});

test("Should return the order list", async () => {
  const output = await getOrders.execute();
  expect(output.orders.length > 0).toBeTruthy();

  setTimeout(async () => {
    await orderRepository.clear();
  }, 1000);
});
