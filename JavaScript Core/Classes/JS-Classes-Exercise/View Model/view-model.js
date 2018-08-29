class Textbox {
    constructor(selector,regex){
        this._elements=$(selector);
        this.value=$(this.elements[0]).val();
        this._inavalidSymbols=regex;
        this.onInput()
    }
    onInput(){
        this.elements.on('input',(event)=>{
            this.value=$(event.target).val()
        })
    }

    get elements(){
        return this._elements;
    }

    get value(){
        return this._value;
    }
    set value(value){
        this._value=value;
        for (const element of this.elements) {
            $(element).val(value);
        }
    }
    isValid(){
        return !this._inavalidSymbols.test(this.value)
    }
}
let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = $('.textbox');

inputs.on('input',function(){console.log(textbox.value);});
