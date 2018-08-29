class Dialog {
    constructor(textMessage, callback) {
        this.textMessage = textMessage;
        this.callback = callback;
        this.inputs = [];
        this.element = null;
    }

    addInput(label, name, type) {
        this.inputs.push([label, name, type])
    }

    render() {
        this.element = this.createElement()
        $(document.body).append(this.element);
    }

    createElement() {
        let dialog = $('<div class="overlay"></div>')
        let element = $(' <div class="dialog"></div>')
        element.append(`<p>${this.textMessage}</p>`)
        for (const input of this.inputs) {
            element.append($(`<label>${input[0]}</label>`))
            element.append($(`<input name="${input[1]}" type="${input[2]}">`))
        }

        let okBtn = $('<button>OK</button>');
        okBtn.on('click', () => {
            let params = {};
            let inputs = this.element.find('input');
            for (let i = 0; i < inputs.length; i++) {
                let inputName = $(inputs[i]).attr("name");
                let value = $(inputs[i]).val();
                params[inputName] = value;
            }
            $(this.element).remove();
            this.callback(params);

        })
        let cancelBtn = $('<button>Cancel</button>');
        cancelBtn.on('click', () => {
            $(this.element).remove();
        })

        element.append(okBtn).append(cancelBtn);
        dialog.append(element)
        return dialog;
    }
}

