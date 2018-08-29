const expect = require('chai').expect;

function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255))
        return undefined; // Green value is invalid
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255))
        return undefined; // Blue value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
}

describe("Valid rgb color", function () {
    it('should return #FF9EAA', function () {
        let result = rgbToHexColor(255, 158, 170);
        expect(result).to.be.equal("#FF9EAA")
    })
    it('should return #0C0D0E', function () {
        let result = rgbToHexColor(12, 13, 14);
        expect(result).to.be.equal("#0C0D0E")
    })
    it('should return #FFFFFF', function () {
        let result = rgbToHexColor(255, 255, 255);
        expect(result).to.be.equal("#FFFFFF")
    })
    it('should return #000000', function () {
        let result = rgbToHexColor(0, 0, 0);
        expect(result).to.be.equal("#000000")
    })
    it('should return undefined', function () {
        let result = rgbToHexColor(-1, 0, 0);
        expect(result).to.be.equal(undefined)
    })
    it('should return undefined', function () {
        let result = rgbToHexColor(0,-1, 0);
        expect(result).to.be.equal(undefined)
    })
    it('should return undefined', function () {
        let result = rgbToHexColor(0, 0, -1);
        expect(result).to.be.equal(undefined)
    })
    it('should return undefined', function () {
        let result = rgbToHexColor(256, 0, 0);
        expect(result).to.be.equal(undefined)
    })
    it('should return undefined', function () {
        let result = rgbToHexColor(0, 256, 0);
        expect(result).to.be.equal(undefined)
    })
    it('should return undefined', function () {
        let result = rgbToHexColor(0, 0, 256);
        expect(result).to.be.equal(undefined)
    })
    it('should return undefined', function () {
        let result = rgbToHexColor(3.14, 0, 0);
        expect(result).to.be.equal(undefined)
    })
    it('should return undefined', function () {
        let result = rgbToHexColor(0, 3.14, 0);
        expect(result).to.be.equal(undefined)
    })
    it('should return undefined', function () {
        let result = rgbToHexColor("5", [3], {8:9});
        expect(result).to.be.equal(undefined)
    })
    it('should return undefined', function () {
        let result = rgbToHexColor();
        expect(result).to.be.equal(undefined)
    })
})
