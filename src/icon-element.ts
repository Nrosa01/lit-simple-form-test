import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TWStyles } from "../tailwind/twlit.js";
import unity from '/unity.svg'

@customElement('icon-element')
export class IconElement extends LitElement {
    static styles = [css``, TWStyles];

    protected render(): unknown {
        return html`
              <img
                transition:scale="{{delay: 250, duration:500}}"
                class="w-20 h-20 text-blue-600"
                alt="Unity Logo"
                src=${unity}
                />
        `
    }
}