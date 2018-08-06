function exractWords(arr) {
    let codes=arr.join(" ").split(" ").filter(c=>c!="0");

    for (let i = 0; i < codes.length; i++) {
        if(codes[i]==="32656"&&codes[i+1]==="19759"&&codes[i+2]==="32763"){
            i+=3;
            let length=Number(codes[i]);
            let asciCodesArray=codes.slice(i+1,i+1+length);

            let word=asciCodesArray.map(x=>String.fromCharCode(Number(x))).join("")
            console.log(word);
        }
    }
}

exractWords(
    [
        '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 32656 19759 32763 0',
        '5 0 71 111 115 104 111 0 0 0 0 0 0 0 0 0 32656 19759 32763 0 4 0',
        '75 105 114 111 0 0 0 0 0 0 0 0 0 0 32656 19759 32763 0 8 0 86 101',
        '114 111 110 105 107 97 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0',
    ]
)