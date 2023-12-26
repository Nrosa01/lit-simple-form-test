import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { TailwindElement } from './core/tailwind'
import unity from '/unity.svg'

@customElement('icon-element')
export class IconElement extends TailwindElement {
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