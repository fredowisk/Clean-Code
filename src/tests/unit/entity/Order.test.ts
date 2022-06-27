import Order from "../../../domain/entity/Order";
import Item from "../../../domain/entity/Item";
import Coupon from "../../../domain/entity/Coupon";
import FreightCalculator from "../../../domain/entity/FreightCalculator";

test("Should request the item successfully using a coupon", () => {
  const cpf = "839.435.452-10";

  const coupon = new Coupon("VALE20", 20);
  const order = new Order(cpf);

  const item = new Item(3, "Video", "VHS", 100);

  order.addItem(item, 5);
  order.addCoupon(coupon);
  const total = order.getTotal();

  expect(total).toBe(400);
});

test("Should request the item successfully without a coupon", () => {
  const cpf = "839.435.452-10";

  const order = new Order(cpf);

  const item = new Item(3, "Video", "VHS", 100);

  order.addItem(item, 5);
  const total = order.getTotal();

  expect(total).toBe(500);
});

test("Should request the item successfully with a expired coupon", () => {
  const cpf = "839.435.452-10";

  const order = new Order(cpf, new Date("2022/06/08"));
  const coupon = new Coupon("VALE20", 20, new Date("2022/06/01"));

  const item = new Item(3, "Video", "VHS", 100);

  order.addItem(item, 5);
  order.addCoupon(coupon);
  const total = order.getTotal();

  expect(total).toBe(500);
});

test("Should throw an invalid CPF error when CPF length is less than 11", () => {
  const cpf = "111.111.111";

  expect(() => new Order(cpf)).toThrow("Invalid CPF!");
});

test("Should throw an invalid CPF error when CPF use only the same number", () => {
  const cpf = "111.111.111-11";

  expect(() => new Order(cpf)).toThrow("Invalid CPF!");
});

test("Should throw an invalid CPF error when CPF doesn't exist", () => {
  const cpf = "123.456.789-10";

  expect(() => new Order(cpf)).toThrow("Invalid CPF!");
});

test("Should request 3 items and calculate freight using default strategy", () => {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date(), new FreightCalculator());

  const item = new Item(
    4,
    "Musical instruments",
    "Guitar",
    1000,
    100,
    30,
    10,
    3
  );

  order.addItem(item, 1);
  order.addItem(item, 1);
  order.addItem(item, 1);

  const freight = order.getFreight();

  expect(freight).toBe(90);
});

test("Should request 3 items and calculate freight using fixed strategy", () => {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date(), new FreightCalculator());

  const item = new Item(
    4,
    "Musical instruments",
    "Guitar",
    1000,
    100,
    30,
    10,
    3
  );

  order.addItem(item, 1);
  order.addItem(item, 1);
  order.addItem(item, 1);

  const freight = order.getFreight();

  expect(freight).toBe(90);
});

test("Should generate an order code every time a new order is created", () => {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date(), new FreightCalculator());

  expect(order.getCode()).toBe("202200000001");
});
