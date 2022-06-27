import SimulateFreight from "../../../application/usecase/SimulateFreight/SimulateFreight";
import FreightCalculator from "../../../domain/entity/FreightCalculator";
import PgPromiseConnectionAdapter from "../../../infra/database/PgPromiseConnectionAdapter";
import ItemRepositoryDatabase from "../../../infra/repository/database/ItemRepositoryDatabase";

let simulateFreight: SimulateFreight;

beforeAll(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const itemRepository = new ItemRepositoryDatabase(connection);
  const freightCalculator = new FreightCalculator();

  simulateFreight = new SimulateFreight(itemRepository, freightCalculator);
});

test("Should simulate with the minimum freight value", async () => {
  const input = {
    orderItems: [{ idItem: 4, quantity: 1 }],
  };

  const output = await simulateFreight.execute(input);
  expect(output.total).toBe(30);
});

test("Should simulate with the full freight value", async () => {
  const input = {
    orderItems: [{ idItem: 7, quantity: 1 }],
  };

  const output = await simulateFreight.execute(input);
  expect(output.total).toBe(600);
});

test("Should throw an error if the item doesnt exist", async () => {
  const input = {
    orderItems: [{ idItem: 10, quantity: 1 }],
  };

  await expect(simulateFreight.execute(input)).rejects.toThrow(
    "Item not found!"
  );
});
