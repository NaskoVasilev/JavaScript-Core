function solve(JSONinfo) {
    let objects=JSONinfo.map(x=>JSON.parse(x));

    let html="<table>\n";
    for (let obj of objects) {
        html+="\t<tr>\n";
        html+=`\t\t<td>${obj.name}</td>\n`;
        html+=`\t\t<td>${obj.position}</td>\n`;
        html+=`\t\t<td>${obj.salary}</td>\n`;
        html+="\t<tr>\n";
    }
    html+="</table>";
    console.log(html);
}
solve([
    '{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'
])