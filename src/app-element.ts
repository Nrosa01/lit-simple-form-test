import { LitElement, TemplateResult, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { TWStyles } from "../tailwind/twlit.js";

@customElement('app-element')
export class AppElement extends LitElement {
    static styles = [css``, TWStyles];

    private isEmpty(str: string): boolean {
        return !str || 0 === str.length;
    }

    protected onInput(e: CustomEvent): void {
        const target = e.target as HTMLInputElement;
        this.name = target.value;
        this.isValidName = this.name.length >= 4 || this.isEmpty(this.name);
    }

    @state()
    name = "Rioni";

    @state()
    isValidName: boolean = this.name.length >= 4 || this.isEmpty(this.name);

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
                    <form-label-element title="Name" ?condition=${this.isValidName} value=${this.name} @onInput=${this.onInput}></form-label-element>
                    <p>Value ${this.name}, Condition ${this.isValidName}</p>
                </form>
            </div>
        </div>
        `
    }
}