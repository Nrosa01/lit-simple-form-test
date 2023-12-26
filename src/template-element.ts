import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { TailwindElement } from './core/tailwind'

@customElement('template-element')
export class TemplateElement extends TailwindElement {
    protected render(): unknown {
        return html`
              <p>template</p>
        `
    }
}