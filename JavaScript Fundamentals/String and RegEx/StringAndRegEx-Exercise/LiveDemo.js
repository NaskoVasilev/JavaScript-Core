function solve(text,word){
    let pattern="\\b"+word+"\\b";
    let regex=new RegExp(pattern,"gi");
    let matches=text.match(regex);
    if(matches) {
        console.log(matches.length)
    }
    else{
        console.log(0);
    }
}
solve("There was one. Therefore I bought it. I wouldn’t buy it otherwise."
    ,"there")
