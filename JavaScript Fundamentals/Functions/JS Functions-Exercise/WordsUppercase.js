function wordsUppercase(str) {
    str=str.toUpperCase();

    let words=str.split(/\W+/)
        .filter(w=>w!='')
        .join(', ');

    console.log(words);
}

wordsUppercase('Hi, how are you?');