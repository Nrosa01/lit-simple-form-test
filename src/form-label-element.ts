import { LitElement, PropertyValueMap, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { TWStyles } from "./tailwind/twlit.js";

@customElement('form-label-element')
export class FormLabelElement extends LitElement {
  static styles = [css``, TWStyles];

  @property()
  title = "Title";

  @property()
  value = "Empty";

  @property({ type: Boolean })
  condition = true;

  conditionMetClass = "focus:ring-blue-600";
  conditionNotMetClass = "border-red-600 focus:ring-transparent";
  base_styles = `w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1`;

  protected onInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    // Dispatches an event that bubbles through the DOM, this passes shadow DOM boundaries (composed property)
    this.dispatchEvent(
      new CustomEvent('onInput', {
        detail: {
          value: this.value,
          title: this.title,
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
                <input
                placeholder="${this.title}"
                .value="${this.value}"
                class="${this.base_styles} ${this.condition ? this.conditionMetClass : this.conditionNotMetClass}"
                @input="${this.onInput}"
                /> </label
                ></label>
              </div>
          </div>
        `;
  }
}