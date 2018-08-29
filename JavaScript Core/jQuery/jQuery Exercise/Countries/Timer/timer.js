function timer(){
    let hours=$('#hours');
    let minutes=$('#minutes');
    let inputSeconds=$('#seconds');
    let startBtn=$('#start-timer');
    let stopBtn=$('#stop-timer');

    let seconds=0;
    let interval=null;

    $(startBtn).on('click',function () {
        if(interval===null){
            interval=setInterval(increment,1000);
    }
    })

    $(stopBtn).on('click',function () {
        clearInterval(interval)
        interval=null;
    })

    function increment() {
        seconds++;
        $(hours).text(('0'+Math.floor(seconds/3600)).slice(-2));
        $(minutes).text(('0'+(Math.floor(seconds/60)%60)).slice(-2));
        $(inputSeconds).text(('0'+seconds%60).slice(-2));
    }
}