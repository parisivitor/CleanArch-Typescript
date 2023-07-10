import EventInterface from "./event.interface";

export default interface EventHandlerInterface<T extends EventInterface = EventInterface> {
    hadle(event: T): void;
}
