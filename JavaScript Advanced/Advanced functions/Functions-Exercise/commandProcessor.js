function solve(arr) {
    let commandProcessor=(function () {
        let result="";
        return{
            'append':(word)=>result+=word,
            'removeStart':(num)=>result=result.substring(num),
            'removeEnd':(num)=>result=result.substring(0,result.length-num),
            'print':(word)=>console.log(result)
        }
    })()

    for (const command of arr) {
        let [action,item]=command.split(' ')
        commandProcessor[action](item)
    }
}

solve(['append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print']
)