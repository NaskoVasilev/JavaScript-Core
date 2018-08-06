function solve([row, col, x, y]) {
    let matrix = [];

    for (let i = 0; i < row; i++) {
        let innerArray=[];
        for (let j = 0; j < col; j++) {
            innerArray.push(0);
        }
        matrix.push(innerArray);
    }
    let number = 1;
    let layer=1;
    matrix[x][y] = number;

    while (!isFilled(matrix)) {
        number++;
        let topX=Math.max(0,x-layer);
        let topY=Math.max(0,y-layer);
        let bottomX=Math.min(row-1,x+layer);
        let bottomY=Math.min(col-1,y+layer);

        for (let i = topX; i <=bottomX; i++) {
            for (let j = topY; j <=bottomY; j++) {
                if(matrix[i][j]===0){
                    matrix[i][j]=number;
                }
            }
        }

        layer++;
    }

    console.log(matrix.map(row => row.join(" ")).join('\n'));;

    function isFilled(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 0) {
                    return false;
                }

            }
        }
        return true;
    }
}

solve([5,5,2,2])