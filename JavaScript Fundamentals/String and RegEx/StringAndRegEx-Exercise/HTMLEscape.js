function solve(items) {
    String.prototype.htmlEscape = function () {
        return this.replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
    }

    let html = "<ul>\n";
    items.forEach(e => {
            html += "<li>"
            html += e.htmlEscape();
            html += "</li>\n";
        }
    )
    html += "</ul>";

    console.log(html);
}

solve(["br<br>"])