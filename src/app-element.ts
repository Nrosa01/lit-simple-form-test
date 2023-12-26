import { LitElement, TemplateResult, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { TailwindElement } from './core/tailwind'
import Texts from "./assets/data/en.json";
// import { FormLabelElement } from "./form-label-element";

@customElement('app-element')
export class AppElement extends TailwindElement {
    private isEmpty(str: string): boolean {
        return !str || 0 === str.length;
    }

    private validateEmail(str: string) {
        var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegEx.test(String(str).toLowerCase());
    }

    private isPassword(password: string) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(password);
    }

    private isPasswordMatch(password: string, confirmPassword: string) {
        return password === confirmPassword;
    }

    private containsSpecialCharacters(str: string) {
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return format.test(str);
    }

    protected onInput(e: CustomEvent): void {
        // It's cool I can access the component this way, Ill leave it here so I remember
        // const target = e.target as FormLabelElement;

        switch (e.detail.title) {
            case Texts["Name"]:
                this.name = e.detail.value;
                this.isValidName = this.name.length >= 4 || this.isEmpty(this.name);
                break;
            case Texts["Email"]:
                this.email = e.detail.value;
                this.isValidEmail = this.validateEmail(this.email) || this.isEmpty(this.email);
                break;
            case Texts["Password"]:
                this.password = e.detail.value;
                this.isValidPassword = this.isPassword(this.password) || this.isEmpty(this.password);

                if (!this.isValidPassword)
                    this.confirmPassword = "";
                else
                    // Sadly due to not having two way binding I have to do this
                    this.isValidConfirmPassword = this.isPasswordMatch(this.password, this.confirmPassword) || this.isEmpty(this.confirmPassword);
                break;
            case Texts["Confirm Password"]:
                this.confirmPassword = e.detail.value;
                this.isValidConfirmPassword = this.isPasswordMatch(this.password, this.confirmPassword) || this.isEmpty(this.confirmPassword);
                break;
            default:
                break;
        }

        let fieldsNotEmpty = !this.isEmpty(this.name) && !this.isEmpty(this.email) && !this.isEmpty(this.password) && !this.isEmpty(this.confirmPassword);
        this.isFormValid = this.isValidName && this.isValidEmail && this.isValidPassword && this.isValidConfirmPassword && fieldsNotEmpty;
    }

    // Non reactive properties
    name = "";
    email = "";
    @state() // This one is reactive because of line 108
    password = "";
    confirmPassword = "";

    @state()
    isValidName: boolean = this.name.length >= 4 || this.isEmpty(this.name);

    @state()
    isValidEmail: boolean = this.validateEmail(this.email) || this.isEmpty(this.email);

    @state()
    isValidPassword: boolean = this.isPassword(this.password) || this.isEmpty(this.password);

    @state()
    isValidConfirmPassword: boolean = this.isPasswordMatch(this.password, this.confirmPassword) || this.isEmpty(this.confirmPassword);

    @state()
    isFormValid = false

    protected render(): unknown {
        return html`            
    <main>
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
                    <!--- Name label --->
                    <form-label-element title=${Texts["Name"]} ?condition=${this.isValidName} value=${this.name} @onInput=${this.onInput}></form-label-element>
                    <div ?hidden=${this.isValidName} transition:slide class="text-xs text-red-400 font-medium">${Texts["NameErrorLabel"]}</div>

                    <!--- Email label --->
                    <form-label-element title=${Texts["Email"]} ?condition=${this.isValidEmail} value=${this.email} @onInput=${this.onInput}></form-label-element>
                    <div ?hidden=${this.isValidEmail} transition:slide class="text-xs text-red-400 font-medium">${Texts["EmailErrorLabel"]}</div>

                    <!--- Password label --->
                    <password-label-element title=${Texts["Password"]} ?condition=${this.isValidPassword && !this.containsSpecialCharacters(this.password)} value=${this.password} @onInput=${this.onInput}></password-label-element>
                    <div class="inline flex-col">
                        <div ?hidden=${this.isValidPassword} transition:slide class="text-xs text-red-400 font-medium">${Texts["PasswordErrorLabel"]}</div>
                        <div ?hidden=${!this.containsSpecialCharacters(this.password)} transition:slide class="text-xs text-red-400 font-medium">${Texts["NoSpecialCharacters"]}</div>
                    </div>

                    <!--- Confirm Password label --->
                    <password-label-element title=${Texts["Confirm Password"]} ?condition=${this.isValidConfirmPassword} ?disabled=${!this.isPassword(this.password) || this.isEmpty(this.password)} value=${this.confirmPassword} @onInput=${this.onInput}></password-label-element>
                    <div ?hidden=${this.isValidConfirmPassword} transition:slide class="text-xs text-red-400 font-medium">${Texts["ConfirmPasswordErrorLabel"]}</div>

                    <!--- Submit button --->
                    <large-button-element ?canBeClicked=${this.isFormValid} @click=${() => alert(Texts["AccountCreated"])}>${Texts["CreateAccount"]}</large-button-element>

                    <div class="mt-6 text-grey-dark">
                      ${Texts["Already have an account?"]}
                      <a class="text-blue-600 hover:underline" href="#/">
                          ${Texts["Login"]}
                      </a>
                    </div>
                </form>
            </div>
        </div>
    </main>
        `
    }
}