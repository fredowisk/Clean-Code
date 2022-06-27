import DomainEvent from "./DomainEvent";

interface Handler {
  name: string;
  handle(event: DomainEvent): void;
}

export default Handler;
