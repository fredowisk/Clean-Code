import FreightCalculator from "../../../domain/entity/FreightCalculator";
import ItemRepository from "../../../domain/repository/ItemRepository";
import SimulateFreightInput from "./SimulateFreightInput";
import SimulateFreightOutput from "./SimulateFreightOutput";

class SimulateFreight {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly freightCalculator: FreightCalculator
  ) {}

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    let totalFreight = 0;
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      if (!item) throw new Error("Item not found!");
      totalFreight +=
        this.freightCalculator.calculate(item) * orderItem.quantity || 0;
    }

    const output = new SimulateFreightOutput(totalFreight);
    return output;
  }
}

export default SimulateFreight;
