import Item from "../entity/Item";

interface ItemRepository {
  findById(idItem: number): Promise<Item | undefined>;
}

export default ItemRepository;
