import OrderCode from "../../../domain/entity/OrderCode";

test("Should create an order code", () => {
  const date = new Date("2022/06/10");
  const sequence = 2;
  const orderCode = new OrderCode(date, sequence);
  expect(orderCode.value).toBe("202200000002");
});
