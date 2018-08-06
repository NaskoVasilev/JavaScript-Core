function solve(text) {
    let regex=/(?<= _|^_)[A-Za-z0-9]+\b/g
    let variableNames=text.match(regex);
    console.log(variableNames.join(","));
}

solve("Calculate the _area of the _perfectRectangle object.")