import axios from "axios";

test("Should use the API to create an order", async () => {
  const response = await axios({
    url: "http://localhost:3000/orders",
    method: "post",
    data: {
      cpf: "839.435.452-10",
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      date: new Date("2022-06-08"),
      coupon: "VALE20",
    },
  });

  expect(response.status).toBe(200);
  expect(response.data.total).toBe(138);
});

test("Should use the API to simulate the freight", async () => {
  const response = await axios({
    url: "http://localhost:3000/simulateFreight",
    method: "post",
    data: {
      orderItems: [{ idItem: 4, quantity: 1 }],
    },
  });

  expect(response.status).toBe(200);
  expect(response.data.total).toBe(30);
});

test("Should use the API to validate a coupon", async () => {
  const response = await axios({
    url: "http://localhost:3000/validateCoupon",
    method: "post",
    data: {
      code: "VALE20",
    },
  });

  expect(response.status).toBe(200);
  expect(response.data).toBeTruthy();
});

test("Should use the API to get an order", async () => {
  const response = await axios({
    url: "http://localhost:3000/getOrder",
    method: "get",
    data: {
      code: "202200000001",
    },
  });

  expect(response.status).toBe(200);
  expect(response.data.code).toBe("202200000001");
});

test("Should use the API to get the orders list", async () => {
  const response = await axios({
    url: "http://localhost:3000/getOrders",
    method: "get",
  });

  expect(response.status).toBe(200);
  expect(response.data.orders).toBeInstanceOf(Array);
  expect(response.data.orders.length > 0).toBeTruthy();
});

test("Should use the API to get a specific order in the order list", async () => {
  const response = await axios({
    url: "http://localhost:3000/getOrders/202200000001",
    method: "get",
  });

  expect(response.status).toBe(200);
  expect(response.data.code).toBe("202200000001");
});
