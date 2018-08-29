function attachEventsListeners() {
    document.getElementById('convert')
        .addEventListener("click", convert);

    function convert() {

        let distance=Number(document.getElementById('inputDistance').value);
        let startRate=document.getElementById('inputUnits').value;
        let endRate=document.getElementById('outputUnits').value;

        if(startRate==='km')distance*=1000;
        else if(startRate==='cm')distance/=100;
        else if(startRate==='mm')distance/=1000;
        else if(startRate==='mi')distance*=1609.34;
        else if(startRate==='yrd')distance*=0.9144;
        else if(startRate==='ft')distance*=0.3048;
        else if(startRate==='in')distance*=0.0254;

        if(endRate==="km")distance/=1000;
        else if(endRate==='cm')distance*=100;
        else if(endRate==='mm')distance*=1000;
        else if(endRate==='mi')distance/=1609.34;
        else if(endRate==='yrd')distance/=0.9144;
        else if(endRate==='ft')distance/=0.3048;
        else if(endRate==='in')distance/=0.0254;

        document.getElementById('outputDistance').value=distance;
    }
}

//1 m = 1 m
// 1 cm = 0.01 m
// 1 mm = 0.001 m
// 1 mi = 1609.34 m
// 1 yrd = 0.9144 m
// 1 ft = 0.3048 m
// 1 in = 0.0254 m