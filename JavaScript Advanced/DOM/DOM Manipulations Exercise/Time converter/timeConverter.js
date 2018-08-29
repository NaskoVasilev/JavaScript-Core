function attachEventsListeners() {
    let inputDays=document.getElementById('days');
    let inputHours=document.getElementById('hours');
    let inputMinutes=document.getElementById('minutes');
    let inputSeconds=document.getElementById('seconds');
    let days;
    let hours;
    let minutes;
    let seconds;
    document.getElementById('daysBtn')
        .addEventListener("click", convertDays)

    function convertDays(){
        days=Number(inputDays.value);
        hours=days*24;
        minutes=hours*60;
        seconds=minutes*60;
        inputHours.value=hours;
        inputMinutes.value=minutes;
        inputSeconds.value=seconds;
    }

    document.getElementById('hoursBtn')
        .addEventListener("click", convertHours)

    function convertHours(){
        hours=Number(inputHours.value);
        inputDays.value=hours/24;
        inputMinutes.value=hours*60;
        inputSeconds.value=hours*3600;
    }

    document.getElementById('minutesBtn')
        .addEventListener("click", convertMinutes)

    function convertMinutes(){
        minutes=Number(inputMinutes.value);
        inputDays.value=minutes/60/24;
        inputHours.value=minutes/60;
        inputSeconds.value=minutes*60;
    }

    document.getElementById('secondsBtn')
        .addEventListener("click", convertSeconds)

    function convertSeconds(){
        seconds=Number(inputSeconds.value);
        inputDays.value=seconds/60/60/24;
        inputHours.value=seconds/60/60;
        inputMinutes.value=seconds/60;
    }
}