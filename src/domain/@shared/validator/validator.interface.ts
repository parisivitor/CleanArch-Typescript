export default interface ValidatorInerface<T> {
    validate(entity: T): void;
}
