import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class Corys5thElement extends DDDSuper(LitElement) {

  static get tag() {
    return "corys-5th-element";
  }

  constructor() {
    super();
    this.title = "Counter App"; // Default title
    this.counter = 0;  // Default counter value
    this.min = 0;      // Default minimum value
    this.max = 10;     // Default maximum value
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--corys-5th-element-font-size, var(--ddd-font-size-s));
        padding: 16px;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        text-align: center;
      }
      .counter {
        font-size: 3rem;
        margin-bottom: 16px;
        transition: color 0.3s ease;
      }
      .counter.min, .counter.max {
        color: red;
      }
      .counter.mid-range {
        color: green;
      }
      .counter.high-range {
        color: blue;
      }
      button {
        padding: 8px 16px;
        margin: 8px;
        font-size: 1.5rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      button:hover {
        background-color: lightgray;
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `];
  }

  render() {
    return html`
      <div class="wrapper">
        <div>${this.title}</div>
        <div class="counter ${this._getCounterClass()}">${this.counter}</div>
        <button @click="${this._decrement}" ?disabled="${this.counter === this.min}">-</button>
        <button @click="${this._increment}" ?disabled="${this.counter === this.max}">+</button>
        <confetti-container id="confetti"></confetti-container>
        <slot></slot>
      </div>`;
  }

  _increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  _decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  _getCounterClass() {
    if (this.counter === this.min || this.counter === this.max) {
      return 'min max';
    }
    if (this.counter >= 21) {
      return 'high-range';
    }
    if (this.counter >= 18) {
      return 'mid-range';
    }
    return '';
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(Corys5thElement.tag, Corys5thElement);
