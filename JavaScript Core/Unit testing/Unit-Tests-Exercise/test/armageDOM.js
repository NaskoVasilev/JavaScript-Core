this.jsdom = require('jsdom-global')();
global.$ = require('jquery');
let expect = require('chai').expect;

function nuke(selector1, selector2) {
    if (selector1 === selector2) return;
    $(selector1).filter(selector2).remove();
}

describe('Function nuke tests', function () {
    let body;
    beforeEach(function () {
        document.body.innerHTML = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>ArmageDOM</title>
        </head>
        <body>
        <div id="target">
            <div class="nested target">
                <p>This is some text</p>
            </div>
            <div class="target">
                <p>Empty div</p>
            </div>
            <div class="inside">
                <span class="nested">Some more text</span>
                <span class="target">Some more text</span>
            </div>
        </div>
        </body>
        </html>
        `
        body=$('body').html();
    })

    it('should do nothing for equal parameters',function () {
        nuke('.nested','.nested');
        expect(body).to.be.equal($('body').html())
    })
    it('should do nothing with a invalid parameter',function () {
        nuke('div',1);
        expect(body).to.be.equal($('body').html())
    })
    it('should do nothing with a invalid parameter',function () {
        nuke({name:'div'},'div');
        expect(body).to.be.equal($('body').html())
    })
    it('should do nothing with a empty parameter',function () {
        nuke('','div')
        expect(body).to.be.equal($('body').html())
    })
    it('should do nothing with only one parameter',function () {
        nuke('div');
        expect(body).to.be.equal($('body').html())
    })
    it('should do nothing with non-existent parameters',function () {
        nuke('#aaaa','#target');
        expect($('#target')).to.exist;
        expect($('#aaaa').length).to.be.equal(0);
        expect(body).to.be.equal($('body').html())
    })
    it('should remove all  elements which match both selector',function () {
        nuke('div','.inside');
        expect($('div .inside').length).to.be.equal(0)
    })
    it('should remove all  elements which match both selector',function () {
        nuke('span','.nested');
        expect($('span .nested').length).to.be.equal(0)
        expect($('.inside span').length).to.be.equal(1)
        expect($('.target').length).to.not.equal(0)
    })
    it('should remove all  elements which match both selector',function () {
        nuke('.target','div');
        expect($('.target').length).to.not.equal(0)
        expect($('.target div').length).to.be.equal(0)
        expect($('#target div').length).to.be.equal(1)
    })
})
