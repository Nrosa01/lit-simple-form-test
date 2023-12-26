import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TWStyles } from "../tailwind/twlit.js";

@customElement('template-element')
export class TemplateElement extends LitElement {
    static styles = [css``, TWStyles];

    protected render(): unknown {
        return html`
              <p>template</p>
        `
    }
}