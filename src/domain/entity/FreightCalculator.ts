import Freight from "./Freight";
import Item from "./Item";

const MIN_VALUE: number = 10;
const DISTANCE: number = 1000;

class FreightCalculator implements Freight {
  calculate(item: Item): number {
    const totalPrice =
      DISTANCE * item.calculateVolume() * (item.calculateDensity() / 100);
    return Math.max(MIN_VALUE, totalPrice);
  }
}

export default FreightCalculator;
