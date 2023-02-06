import classNames from "classnames";
import EventEmitter from "eventemitter3";

export default class Card extends EventEmitter {
    static events = {
        ADD_TO_CART: "add_to_cart",
    };

    static types = {
        PEPPERONI: "pepperoni",
        MARGHERITA: "margherita",
        HAWAIIAN: "hawaiian",
    };

    container = document.createElement("div");

    constructor({ type, price }) {
        super();
        this._type = type;
        this._price = price;
        this.container.classList.add("card-container");
    }

    render = () => {
        this.container.innerHTML = `
        <div class="card type-${this._type} ${classNames({ "is-danger": this._type === Card.types.HAWAIIAN, })}"> 
            <div class="emoji">🍕</div> 
            <span class="type">${this._type}</span> 
        </div> `;
        this.container.addEventListener("click", () => {
            this.emit(Card.events.ADD_TO_CART, {
                type: this._type,
                price: this._price,
            });
        });
    };
}