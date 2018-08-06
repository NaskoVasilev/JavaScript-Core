function solve(matrix) {
    let mainDiagonalSum=0;
    let secondaryDiagonalSum=0;
    for (let i = 0; i <matrix.length; i++) {
        mainDiagonalSum+=matrix[i][i];
        secondaryDiagonalSum+=matrix[i][matrix.length-i-1];
    }
    console.log(mainDiagonalSum+" "+secondaryDiagonalSum);
}
solve([
    [1,2,3],
    [4,5,6],
    [7,8,9]
])