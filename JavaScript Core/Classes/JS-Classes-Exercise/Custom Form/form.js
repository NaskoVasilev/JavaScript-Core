let result = (function () {
    class Textbox {
        constructor(selector, regex) {
            this._elements = $(selector);
            this.value = $(this.elements[0]).val();
            this._invalidSymbols = regex;
            this.onInput()
        }

        onInput() {
            this.elements.on('input', (event) => {
                this.value = $(event.target).val()
            })
        }

        get elements() {
            return this._elements;
        }

        get value() {
            return this._value;
        }

        set value(value) {
            this._value = value;
            for (const element of this.elements) {
                $(element).val(value);
            }
        }

        isValid() {
            return !this._invalidSymbols.test(this.value)
        }
    }

    class Form {
        constructor() {
            this._element = $('<div>').addClass('form');
            this._textboxes = arguments;
            this.validate();
        }

        validate() {
            for (const textbox of this._textboxes) {
                if (!textbox instanceof Textbox) {
                    throw new Error('Invalid parameter passed')
                } else {
                    this._element.append(textbox.elements);
                }
            }
        }

        submit() {
            let allValid = true;
            for (let textbox of this._textboxes) {
                if (textbox.isValid()) {
                    $(textbox.elements).css('border', '2px solid green')
                } else {
                    $(textbox.elements).css('border', '2px solid red')
                    allValid = false;
                }
            }

            return allValid;
        }

        attach(selector) {
            $(selector).append(this._element)
        }
    }

    return {
        Form:Form,
        Textbox:Textbox
    }
})()

let Form=result.Form;
let Textbox=result.Textbox;
let username = new Textbox("#username",/[^a-zA-Z0-9]/);
let password = new Textbox("#password",/[^a-zA-Z]/);
username.value = "username";
password.value = "password2";
let form = new Form(username,password);
form.attach("#root");
