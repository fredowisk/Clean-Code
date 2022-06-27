import OrderPlacedStockHandler from "../../../application/handlers/OrderPlacedStockHandler";
import GetStock from "../../../application/usecase/GetStock/GetStock";
import PlaceOrder from "../../../application/usecase/PlaceOrder/PlaceOrder";
import Broker from "../../../infra/broker/Broker";
import DatabaseRepositoryFactory from "../../../infra/factory/DatabaseRepositoryFactory";

let placeOrder: PlaceOrder;
let getStock: GetStock;

beforeAll(() => {
  const repositoryFactory = new DatabaseRepositoryFactory();
  // const repositoryFactory = new MemoryRepositoryFactory();
  const broker = new Broker();
  broker.register(new OrderPlacedStockHandler(repositoryFactory));
  placeOrder = new PlaceOrder(repositoryFactory, broker);
  getStock = new GetStock(repositoryFactory);
});

test("Should request an order", async () => {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2022-06-08"),
    coupon: "VALE20",
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(138);
});

test("Should request an order, and calculate the freight", async () => {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2022-06-08"),
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6350);
});

test("Should throw an error if the item doesnt exist", async () => {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [{ idItem: 10, quantity: 1 }],
    date: new Date("2022-06-08"),
  };

  await expect(placeOrder.execute(input)).rejects.toThrow("Item not found!");
});

test("Should request an order with orderCode ", async () => {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2022-06-08"),
  };
  const output = await placeOrder.execute(input);
  expect(output.code).toBe("202200000003");
});

test("Should request an order and withdraw from stock", async () => {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2022-06-08"),
  };
  await placeOrder.execute(input);
  const total1 = await getStock.execute(4);
  const total2 = await getStock.execute(3);
  expect(total1).toBe(-3);
  expect(total2).toBe(-3);
  await getStock.stockEntryRepository.clear();
});
