import { LitElement, TemplateResult, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { TWStyles } from "../tailwind/twlit.js";
import Texts from "./assets/data/en.json";

@customElement('app-element')
export class AppElement extends LitElement {
    static styles = [css``, TWStyles];

    private isEmpty(str: string): boolean {
        return !str || 0 === str.length;
    }

    protected onInput(e: CustomEvent): void {
        const target = e.target as HTMLInputElement;
        // Here I would change different values depending on who's the target
        // But for now I hardcode the name
        this.name = target.value;
        this.isValidName = this.name.length >= 4 || this.isEmpty(this.name);
    }

    @state()
    name = "";

    @state()
    isValidName: boolean = this.name.length >= 4 || this.isEmpty(this.name);

    protected render(): unknown {
        return html`            
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div transition:scale="{{duration: 500, delay: 50}}" class="px-8 py-6 mx-4 mt-4 mb-4 text-left bg-white shadow-lg md:w-1/2 lg:w-1/3 sm:w-1/3">
                <div class="flex justify-center">
                    <icon-element></icon-element>
                </div>
                <!--- Transitions are Svelte directive, I left them here as placeholder to remember that I have to make them somehow in lit --->
                <!--- I know I could just pass a function to the form label to handle the validation and render of the exception but I wanted to keep most similar possible to svelte version --->
                <h3 transition:scale="{{delay: 350, duration:500}}" class="text-2xl font-bold text-center">LTS</h3>
                <h6 transition:scale="{{delay: 450, duration:500}}" class="text-s text-gray-500 font-semibold text-center">Long Term Suffering</h6>
                <form action="">
                    <form-label-element title=${Texts["Name"]} ?condition=${this.isValidName} value=${this.name} @onInput=${this.onInput}></form-label-element>
                    <div ?hidden=${this.isValidName} transition:slide class="text-xs text-red-400 font-medium">${Texts["NameErrorLabel"]}</div>
                </form>
            </div>
        </div>
        `
    }
}