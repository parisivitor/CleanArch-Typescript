import ValidatorInerface from "../../@shared/validator/validator.interface";
import Custumer from "../entity/custumers";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default class CustomerValidaorFactory {
    static create(): ValidatorInerface<Custumer> {
        return new CustomerYupValidator();
    }
}
