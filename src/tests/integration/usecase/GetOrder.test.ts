import GetOrder from "../../../application/usecase/GetOrder/GetOrder";
import OrderRepository from "../../../domain/repository/OrderRepository";
import PgPromiseConnectionAdapter from "../../../infra/database/PgPromiseConnectionAdapter";
import OrderRepositoryDatabase from "../../../infra/repository/database/OrderRepositoryDatabase";
import OrderRepositoryMemory from "../../../infra/repository/memory/OrderRepositoryMemory";

let getOrder: GetOrder;
let orderRepository: OrderRepository;

beforeAll(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  orderRepository = new OrderRepositoryDatabase(connection);
  // orderRepository = new OrderRepositoryMemory();

  getOrder = new GetOrder(orderRepository);
});

test("Should return the order if the code is valid", async () => {
  const output = await getOrder.execute("202200000001");
  expect(output.code).toBe("202200000001");
});

test("Should throw an error if the order  doesnt exist", async () => {
  await expect(getOrder.execute("202200000010")).rejects.toThrow(
    "Order not found!"
  );
});
