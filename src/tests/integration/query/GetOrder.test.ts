import GetOrder from "../../../application/query/GetOrder";
import OrderDAODatabase from "../../../infra/dao/OrderDAODatabase";
import PgPromiseConnectionAdapter from "../../../infra/database/PgPromiseConnectionAdapter";

test("Should find the order by code and return it", async () => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const orderDAO = new OrderDAODatabase(connection);
  const getOrders = new GetOrder(orderDAO);
  const output = await getOrders.execute("202200000001");
  expect(output.code).toBe("202200000001");
  expect(output.total).toBe(138);
});
