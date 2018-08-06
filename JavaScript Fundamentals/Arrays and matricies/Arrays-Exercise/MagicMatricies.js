function magicMatrix(matrix) {
    let sum=matrix[0].reduce((
        a,b)=>a+b);
    let length=matrix.length;
    for (let i = 0; i <length; i++) {
        if((matrix[i].reduce((a,b)=>a+b))!==sum){
            return false;
        }
        let columnSum=0;
        for (let j = 0; j <length; j++) {
            columnSum+=matrix[i][j];
        }
        if(columnSum!==sum){
            return false;
        }
    }
    return true;


}

console.log(magicMatrix([[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
));