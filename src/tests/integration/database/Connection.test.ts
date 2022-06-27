import PgPromiseConnectionAdapter from "../../../infra/database/PgPromiseConnectionAdapter";

test("Should create a connection to the database", async () => {
  const connection = PgPromiseConnectionAdapter.getInstance();

  const itemsData = await connection.query("select * from ccca.item", []);
  expect(itemsData).toHaveLength(7);
});
