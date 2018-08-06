function decode(input) {
    let startIndex = Number(input[0]);
    let endIndex = Number(input[1]);
    let replacement = input[2];
    let message = input[3];
    let regex = /[A-Z]\w+[A-Z]/
    let digitRegex = /\d{3}(\.\d+)?/g

    let match = regex.exec(message);
    let country = match[0];

    let toReplace = country.substring(startIndex, endIndex + 1)
    country = country.replace(toReplace, replacement);
    let decryptedCountry = "";
    for (let i = 0; i < country.length; i++) {
        if (i === country.length - 1) {
            decryptedCountry += country[i].toLowerCase();
        }
        else {
            decryptedCountry += country[i];
        }
    }

    let numbers = message.match(digitRegex)
        .map(Number)
        .map(d => Math.ceil(d));

    let town = "";
    for (let i = 0; i < country.length; i++) {
        if (i === 0) {
            let letter = String.fromCharCode(numbers[i] - 32);
            town += letter;
        }
        else {
            town += String.fromCharCode(numbers[i]);
        }
    }
    console.log(`${decryptedCountry} => ${town}`)
}

decode(["1", "4", "loveni", "SerbiA 67 – sDf1d17ia aTe 1, 108 confin$4%#ed likewise it humanity  Bulg35aria - VarnA railLery1a0s1 111 an unpacked as 109 he"])
//decode(["3", "5", "gar","114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"]);