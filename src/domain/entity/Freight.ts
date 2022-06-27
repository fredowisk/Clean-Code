import Item from "./Item";

interface Freight {
  calculate(item: Item): number;
}

export default Freight;
