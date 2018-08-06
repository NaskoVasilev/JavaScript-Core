function solve(arr) {
    let matrix=[];
    for (let i = 0; i < arr.length; i++) {
        matrix[i]=arr[i].split(" ").map(e=>parseInt(e));
    }
    let matrixLength = matrix.length;
    let mainDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    for (let i = 0; i < matrixLength; i++) {
        mainDiagonalSum += matrix[i][i];
        secondaryDiagonalSum += matrix[i][matrixLength - 1 - i];
    }

    if (mainDiagonalSum === secondaryDiagonalSum) {
        for (let i = 0; i < matrixLength; i++) {
            let row = "";
            for (let j = 0; j < matrix[i].length; j++) {
                if (i != j && (i + j) != matrixLength - 1) {
                    matrix[i][j] = mainDiagonalSum;
                }
                row += matrix[i][j] + " ";
            }
            console.log(row);
        }
    }
    

}

solve(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']
)