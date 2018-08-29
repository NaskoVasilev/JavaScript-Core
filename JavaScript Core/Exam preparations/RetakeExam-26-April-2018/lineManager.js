class LineManager {
    constructor(stops) {
        this.stops = stops;
        this.currentStop = 0;
        this.duration = 0;
        this.delay = 0;
    }

    set stops(allStops) {
        for (const currentStop of allStops) {
            if (typeof currentStop.name !== 'string' || currentStop.name === ""
                || currentStop.timeToNext < 0 || typeof currentStop.timeToNext!=='number') {
                throw new Error('Invalid stop!')
            }
            this._stops = allStops;
        }
}
    get stops(){
        return this._stops;
    }

    get atDepot() {
        return this.currentStop === this.stops.length - 1;
    }

    get nextStopName() {
        if (this.atDepot) {
            return "At depot"
        }

        return this.stops[this.currentStop + 1].name;
    }

    get currentDelay() {
        return this.delay;
    }

    arriveAtStop(minutes) {
        if (this.atDepot || minutes < 0) {
            throw new Error('No more stops left or time to next stop is less than zero')
        }
        this.delay += minutes - this.stops[this.currentStop].timeToNext;
        this.duration += minutes;
        this.currentStop++;

        return !this.atDepot;
    }

    toString() {
        let line=this.atDepot?'- Course completed\n':`- Next stop: ${this.nextStopName}\n`
        let output='Line summary\n' +
            line +
            `- Stops covered: ${this.currentStop}\n` +
            `- Time on course: ${this.duration} minutes\n` +
            `- Delay: ${this.currentDelay} minutes`;
        return output;
    }

}
const man = new LineManager([
    {name: 'Depot', timeToNext: 4},
    {name: 'Romanian Embassy', timeToNext: 2},
    {name: 'TV Tower', timeToNext: 3},
    {name: 'Interpred', timeToNext: 4},
    {name: 'Dianabad', timeToNext: 2},
    {name: 'Depot', timeToNext: 0},
]);
while(man.atDepot === false) {
    console.log(man.toString());
    man.arriveAtStop(4);
}

console.log(man.toString());

