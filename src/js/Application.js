import EventEmitter from "eventemitter3";
import Card from "./Card";
import Notification from "./Notifications";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    const pizzas = [
      {
        type: Card.types.HAWAIIAN,
        price: 8.99,
      },
      {
        type: Card.types.PEPPERONI,
        price: 9.99,
      },
      {
        type: Card.types.MARGHERITA,
        price: 7.99,
      },
    ];

    const main = document.querySelector(".main");
    const notification = new Notification();

    pizzas.forEach((pizza) => {
      const card = new Card({
        ...pizza,
      });
      card.render();
      card.on(Card.events.ADD_TO_CART, (obj) => {
        notification.render(obj);
      });
      main.appendChild(card.container);
    });

    this.emit(Application.events.READY);
  }
}