export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    getErrors(): NotificationErrorProps[] {
        return this.errors
    }

    addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    messages(context?: string): string {
        // let message = ""
        // this.errors.forEach((error) => {
        //     message += `${error.context}: ${error.message},`
        // })
        // return message
        return this.errors.filter((error) => context == error.context || context == undefined).map((error) => `${error.context}: ${error.message},`).join("")
    }

    hasError(): boolean{
        return this.errors.length > 0
    }
}
