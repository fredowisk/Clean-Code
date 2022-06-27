import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";
import Connection from "../../database/Connection";

class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) {}

  async findById(idItem: number): Promise<Item | undefined> {
    const [itemData] = await this.connection.query(
      "select * from ccca.item where id_item = $1",
      [idItem]
    );
    if (!itemData) return undefined;
    const {
      category,
      description,
      price,
      width,
      height,
      length,
      weight,
    } = itemData;

    return new Item(
      idItem,
      category,
      description,
      price,
      width,
      height,
      length,
      weight
    );
  }
}

export default ItemRepositoryDatabase;
