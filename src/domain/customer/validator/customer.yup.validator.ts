import ValidatorInerface from "../../@shared/validator/validator.interface";
import Custumer from "../entity/custumers";
import * as yup from "yup";

export default class CustomerYupValidator implements ValidatorInerface<Custumer> {
    validate(entity: Custumer): void {
        try {
            yup
            .object()
            .shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name
                }, {
                    abortEarly: false,
                }
            )

        } catch(errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "customer",
                    message: error
                })
            })
        }
    }
}
