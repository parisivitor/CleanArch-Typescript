import OrderItem from "./order_item";

export default class Orders {
    private _id: string;
    private _custumerId: string;
    private _items: OrderItem[];
    private _total: number;


    constructor(id: string, custumerId: string, items: OrderItem[]){
        this._id = id;
        this._custumerId = custumerId;
        this._items = items;
        this._total = this.total();
        this.validate();

    }

    validate(){
        if (this._id.length === 0) {
            throw new Error("id is required");
        }
        if (this._custumerId.length === 0) {
            throw new Error("custumerID is required");
        }
        if (this._items.length === 0) {
            throw new Error("items is required");
        }
        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error("quantity is must be greater than zero")
        }
    }

    total(): number {
        return this._items.reduce((acumulador, item) => acumulador + item.price , 0)
    }

    get id(): string {
        return this._id
    }

    get custumerId(): string {
        return this._custumerId
    }

    get items(): OrderItem[] {
        return this._items
    }
}
