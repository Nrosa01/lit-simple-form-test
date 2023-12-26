import { LitElement, TemplateResult, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TWStyles } from "../tailwind/twlit.js";

@customElement('app-element')
export class AppElement extends LitElement {
    static styles = [css``, TWStyles];

    private getInnerContent(): TemplateResult {
        return html`<p>template</p>`
    }

    protected render(): unknown {
        return html`            
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div transition:scale="{{duration: 500, delay: 50}}" class="px-8 py-6 mx-4 mt-4 mb-4 text-left bg-white shadow-lg md:w-1/2 lg:w-1/3 sm:w-1/3">
                <div class="flex justify-center">
                    <icon-element></icon-element>
                </div>
                <h3 transition:scale="{{delay: 350, duration:500}}" class="text-2xl font-bold text-center">LTS</h3>
                <h6 transition:scale="{{delay: 450, duration:500}}" class="text-s text-gray-500 font-semibold text-center">Long Term Suffering</h6>
                <form action="">
                    <form-label-element title="Name"></form-label-element>
                </form>
            </div>
        </div>
        `
    }
}