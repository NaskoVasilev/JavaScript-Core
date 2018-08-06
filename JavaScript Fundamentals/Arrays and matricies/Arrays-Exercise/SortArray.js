function sortArray(arr) {
   arr.sort((a, b) => {
        if (a.length > b.length) {
            return 1;
        }
        else if (a.length < b.length) {
            return -1;
        }
        else {
            if (a > b) {
                return 1;
            }
            else {
                return -1;
            }
        }
    }).forEach(e=>console.log(e));

}
sortArray(['alpha','beta','gamma'])