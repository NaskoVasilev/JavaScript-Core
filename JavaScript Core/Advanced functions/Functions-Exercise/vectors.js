let solution = (function () {
    return {
        'add': (vector1, vector2) => {
            return [vector1[0] + vector2[0], vector1[1] + vector2[1]]
        },
        'multiply':(vector,scalar)=>{
            return [vector[0]*scalar,vector[1]*scalar]
        },
        'length':(vector)=>{
            return Math.sqrt(vector[0]*vector[0]+vector[1]*vector[1])
        },
        'dot':(vector1,vector2)=>{
            return vector1[0]*vector2[0]+vector1[1]*vector2[1]
        },
        'cross':(vector1,vector2)=>{
            return vector1[0]*vector2[1]-vector1[1]*vector2[0]
        }
    }
})()
console.log(solution.add([1, 1], [1, 0]));
console.log(solution.multiply([3.5, -2], 2));
console.log(solution.length([3, -4]));
console.log(solution.dot([1, 0], [0, -1]));
console.log(solution.cross([3, 7], [1, 0]));