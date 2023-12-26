import { PropertyValues, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { TailwindElement } from './core/tailwind'

@customElement('large-button-element')
export class LargeButtonElement extends TailwindElement {
    @state()
    funnyMode = true;

    @state()
    currentPos = 0;

    @state()
    newPos = 0;

    @state()
    buttonClassBase = "relative w-full:funnyMode px-6 py-2 mt-4 text-white rounded-lg hover:bg-blue-900";

    @state()
    canClickButtonClass = "bg-green-600";

    @state()
    cantClickButtonClass = "bg-blue-600";

    @state()
    funnyModeClass = `${!this.funnyMode ? "w-full" : ""}`;

    @property({ type: Boolean })
    canBeClicked = false;

    @property({ type: String })
    classes = `${this.buttonClassBase} ${this.canBeClicked ? this.canClickButtonClass : this.cantClickButtonClass} ${this.funnyModeClass}`;

    // I could just put these classes directly in the html and not have to do this, but I want to keep this as a reference
    willUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('buttonClassBase') || changedProperties.has('canBeClicked') || changedProperties.has('canClickButtonClass') || changedProperties.has('cantClickButtonClass') || changedProperties.has('funnyModeClass')) {
            this.classes = `${this.buttonClassBase} ${this.canBeClicked ? this.canClickButtonClass : this.cantClickButtonClass} ${this.funnyModeClass}`;
        }

        if (changedProperties.has('funnyMode')) {
            this.funnyModeClass = `${!this.funnyMode ? "w-full" : ""}`;
        }
    }

    @query("#div")
    div!: HTMLDivElement;
    @query("#button")
    button!: HTMLButtonElement;

    // Functions to move the button

    getDivWidth = () => parseInt(window.getComputedStyle(this.div!).width)
    getButtonWidth = () => parseInt(window.getComputedStyle(this.button!).width)

    pixelsToPercentage = (pixels: number) => (pixels / this.getDivWidth()) * 100;
    correctPosition = (threshold: number) => Math.abs(this.newPos - this.currentPos) >= threshold;
    findNewPosition = () => this.newPos = Math.floor(Math.random() * 100) - 50;
    clampPosition = () => {
        let maxRight = this.pixelsToPercentage(this.getDivWidth() / 2 - (this.getButtonWidth() / 2))
        let maxLeft = this.pixelsToPercentage(- this.getDivWidth() / 2 + (this.getButtonWidth() / 2))

        this.newPos = Math.min(Math.max(this.newPos, maxLeft), maxRight);
    }

    move() {
        if (!this.funnyMode)
            return;

        // Save last pos
        this.currentPos = this.newPos;

        let counter = 100;
        do {
            this.findNewPosition();
            this.clampPosition();
            counter--;
        } while (!this.correctPosition(25) && counter > 0)
    }

    onResize() {
        this.clampPosition();
    }

    onFocus() {
        if (!this.canBeClicked)
            if (document.activeElement instanceof HTMLElement)
                document.activeElement.blur();
    }

    constructor() {
        super();
        this.addEventListener('resize', () => { this.onResize(); }, true);
    }

    protected render(): unknown {
        return html`
          <div id = "div" class="flex justify-center">
            <button
              id ="button"
              class="${this.classes}"
              style="transition: left 0.25s ease-in-out; left: ${this.canBeClicked ? 0 : this.newPos}%;"
              type="button"
              @mouseenter="${this.move}"
              @focus="${this.onFocus}"
            >
              <slot></slot>
            </button>
          </div>
        `;
    }
}