import { LitElement, PropertyValueMap, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { TWStyles } from "../tailwind/twlit.js";

@customElement('form-label-element')
export class FormLabelElement extends LitElement {
  static styles = [css``, TWStyles];

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('condition')) {
      this.classes = `w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 ${this.condition ? this.conditionMetClass : this.conditionNotMetClass}`;
    }
  }

  @property()
  title = "Title";

  @property()
  value = "Empty";

  @property({ type: Boolean })
  condition = true;

  @property()
  conditionMetClass = "focus:ring-blue-600";

  @property()
  conditionNotMetClass = "border-red-600 focus:ring-transparent";

  @property()
  classes = `w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 ${this.condition ? this.conditionMetClass : this.conditionNotMetClass}`;

  protected onInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    //</div>this.classes = `w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 ${this.condition ? this.conditionMetClass : this.conditionNotMetClass}`;

    // Dispatches an event that bubbles through the DOM.
    this.dispatchEvent(
      new CustomEvent('onInput', {
        detail: {
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render(): unknown {
    return html`
          <div class="mt-4">
            <div>
              <label class="block" for="${this.title}">${this.title}</label>
                <p>Value ${this.value}, Condition ${this.condition}</p>
                <input
                placeholder="${this.title}"
                .value="${this.value}"
                class="${this.classes}"
                @input="${this.onInput}"
                /> </label
                ></label>
              </div>
          </div>
        `;
  }
}