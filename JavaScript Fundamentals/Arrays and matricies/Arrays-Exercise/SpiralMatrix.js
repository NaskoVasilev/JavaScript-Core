function spiral(row,col){
    let startUpRow=0;
    let startDownRow=row-1;
    let startLeftCol=0;
    let startRightCol=col-1;
    let matrix=[];
    for (let i = 0; i <row; i++) {
        let innerArray=[];
        for (let  j= 0; j <col; j++) {
            innerArray.push(0);
        }
        matrix.push(innerArray);
    }
    let value=1;

    for (let t = 0; t <row/2; t++) {
        for (let i = startLeftCol; i <=startRightCol; i++) {
            matrix[startUpRow][i]=value++;
        }
        startUpRow++;
        for (let i = startUpRow; i <=startDownRow; i++) {
            matrix[i][startRightCol]=value;
            value++;

        }
        startRightCol--;
        for (let i = startRightCol; i >=startLeftCol; i--) {
            matrix[startDownRow][i]=value++;

        }
        startDownRow--;
        for (let i = startDownRow; i >=startUpRow; i--) {
            matrix[i][startLeftCol]=value++;

        }
        startLeftCol++;

    }

    for (let i = 0; i <matrix.length; i++) {
        let row ="";
        for (let j = 0; j <matrix[i].length; j++) {
            row+=matrix[i][j]+" ";
        }
        console.log(row);
    }
}

spiral(5,5);