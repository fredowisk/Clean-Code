import Broker from "./infra/broker/Broker";
import OrderDAODatabase from "./infra/dao/OrderDAODatabase";
import PgPromiseConnectionAdapter from "./infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import RouteConfig from "./infra/http/RouteConfig";

const orderDAO = new OrderDAODatabase(PgPromiseConnectionAdapter.getInstance());

const expressAdapter = new ExpressAdapter();
const repositoryFactory = new DatabaseRepositoryFactory();
const broker = new Broker();

new RouteConfig(expressAdapter, repositoryFactory, orderDAO, broker);

expressAdapter.listen(3000);
