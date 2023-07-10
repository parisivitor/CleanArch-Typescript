import EventHandlerInterface from "../../../@shared/event/event.handler.interface";
import EventInterface from "../../../@shared/event/event.interface";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
    hadle(event: EventInterface): void {
        console.log(`send email to user becouse he created product: ${event.eventData.name}`)
    }
}
