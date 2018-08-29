(function () {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this;
        }
        return this + "";
    }
    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this + str;
        }
        return this + ""
    }
    String.prototype.isEmpty = function () {
        if (this + "" === "") {
            return true;
        }
        else {
            return false;
        }
    }
    String.prototype.truncate = function (n) {
        let str = "";
        if (this.length <= n) {
            str = this.toString();
        }
        else {
            if (n < 4) {
                str = '.'.repeat(n);
            }
            else {
                let words = this.split(' ');
                for (let i = 0; i < words.length; i++) {
                    if ((str + words[i]).length <= n - 3) {
                        str += words[i] + " "
                    } else {
                        break;
                    }
                }

                if (str === "") {
                    str = this.substring(0, n - 3) + "...";
                }
                else {
                    str = str.trim() + "...";
                }
            }
        }
        return str;
    }
    String.format = function () {
        let placeholder = arguments[0]
        for (let i = 1; i < arguments.length; i++) {
            placeholder = placeholder.replace(`{${i - 1}}`, arguments[i])
        }
        return placeholder;
    }
})()

let name = 'ivan aaaaaaaa bbbbbbbb';
console.log(name.truncate(50));
