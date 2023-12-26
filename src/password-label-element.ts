import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { TailwindElement } from './core/tailwind'

import eye from "/eye.svg";
import eye_slash from "/eye-slash.svg";

@customElement("password-label-element")
export class PasswordLabelElement extends TailwindElement {
  private togglePasswordVisibility() {
    this.type = `${this.isVisible ? "password" : "text"}`;
    this.inputField.type = this.type;
    this.isVisible = !this.isVisible;
    this.icon = this.isVisible ? eye : eye_slash;
  }

  type = "password";
  isVisible = false;

  conditionMetClass = "focus:ring-blue-600";
  conditionNotMetClass = "border-red-600 focus:ring-transparent";
  base_styles = `w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1`;

  @query("#inputField")
  inputField!: HTMLInputElement;

  @state()
  icon = eye_slash;

  @property()
  title = "Title";

  @property()
  value = "Empty";

  @property({ type: Boolean })
  condition = true;
  
  @property({ type: Boolean })
  disabled = false;

  protected onInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    // Dispatches an event that bubbles through the DOM, this passes shadow DOM boundaries (composed property)
    this.dispatchEvent(
      new CustomEvent("onInput", {
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
          <div class="relative">
          <input
            id="inputField"
            placeholder="${this.title}"
            .value="${this.value}"
            class="${this.base_styles} ${this.condition ? this.conditionMetClass : this.conditionNotMetClass}"
            .disabled="${this.disabled}"
            type="password"
            @input="${this.onInput}"
          />

          <div
            class="absolute inset-y-0 right-0 flex items-center text-sm leading-5 py-1 mr-2 mt-2 z-10 scale-95 bg-white"
          >
            <button
              tabindex="-1"
              type="button"
              class="w-full h-full text-gray-500 focus:outline-none focus:text-gray-600 m-1 bg-white hover:bg-gray-200 hover:rounded-md duration-200"
              @click="${this.togglePasswordVisibility}"
              href="#"
            >
              <img src="${this.icon}" alt="eye" />
            </button>
          </div>
          </div>
        </div>
      </div>
    `;
  }
}
