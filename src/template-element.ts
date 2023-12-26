import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from './core/tailwind'

@customElement('template-element')
export class TemplateElement extends LitElement {
    protected render(): unknown {
        return html`
              <p>template</p>
        `
    }
}