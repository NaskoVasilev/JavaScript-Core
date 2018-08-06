function countEqualNeigbours(matrix) {
    let neighboursCount = 0;

    for (let row = 0; row < matrix.length - 1; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === matrix[row + 1][col]) {
                neighboursCount++;
            }
            if (matrix[row][col + 1] === matrix[row][col]) {
                neighboursCount++;
            }
            if(row===matrix.length-2&&col<matrix[row].length-1){
                if (matrix[row+1][col] === matrix[row+1][col+1]) {
                    neighboursCount++;
                }
            }

        }
    }
    console.log(neighboursCount)

}

countEqualNeigbours([
    [2,2,5,7,4],
    [4,0,5,3,4],
    [2,5,5,4,2]
    ]
)