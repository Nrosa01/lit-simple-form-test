import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TWStyles } from "../tailwind/twlit.js";

@customElement('form-label-element')
export class FormLabelElement extends LitElement {
    static styles = [css``, TWStyles];

    @property()
    title = "Title";

    @property({ type: Boolean })
    condition = true;

    @property()
    conditionMetClass = "focus:ring-blue-600";

    @property()
    conditionNotMetClass = "border-red-600 focus:ring-transparent";

    @property()
    classes = `w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 ${this.condition ? this.conditionMetClass : this.conditionNotMetClass}`;

    protected render(): unknown {
        return html`
          <div class="mt-4">
            <div>
              <label class="block" for="${this.title}"
                >${this.title}<label>
                  <input
                    bind:this="{ref}"
                    use:typeAction
                    placeholder="${this.title}"
                    bind:value
                    class="${this.classes}"
                  /> </label
              ></label>
            </div>
          </div>
        `;
    }
}