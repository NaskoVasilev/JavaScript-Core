function solve(arr) {
    let rectangles=[];

    for (const input of arr) {
        let width=input[0];
        let height=input[1];
        let rect={
            width:width,
            height:height,
            area:function () {
                return this.width*this.height;
            },
            compareTo:function (otherRect) {
                let areaDiff=otherRect.area()-this.area();
                if(areaDiff===0){
                    return otherRect.width-this.width;
                }
                return areaDiff;
            }
        }
        rectangles.push(rect)
    }

    return rectangles.sort((a,b)=>a.compareTo(b));
}
solve([[10,5],[5,12]])