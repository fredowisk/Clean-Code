import GetOrders from "../../../application/query/GetOrders";
import OrderDAODatabase from "../../../infra/dao/OrderDAODatabase";
import PgPromiseConnectionAdapter from "../../../infra/database/PgPromiseConnectionAdapter";

test("Should find the order by code and return it", async () => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const orderDAO = new OrderDAODatabase(connection);
  const getOrders = new GetOrders(orderDAO);
  const output = await getOrders.execute();
  expect(output.orders.length > 0).toBeTruthy();
});
