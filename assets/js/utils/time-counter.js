class TimeCounter {

    constructor() {
        
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.miliseconds = 1000;
    }

    start() {
        this.interval = setInterval(() => {
            this.seconds++;
            this.toMinutes();
            this.toHours();
        }, this.miliseconds);
    }

    stop() {
        clearInterval(this.interval); 
    }

    toMinutes() {
        if (this.seconds == 60){
            this.minutes++;
            this.seconds = 0;
        }
    }

    toHours(){
        if (this.minutes == 60){
            this.hours++;
            this.minutes = 0;
        }
    }

    toString() {
        let hours = "";
        let mins = "";
        let secs = "";

        if (this.hours < 10) {
            hours = "0" + this.hours;
        } else {
            hours = this.hours;
        }

        if (this.minutes < 10) {
            mins = "0" + this.minutes;
        } else {
            mins = this.minutes;
        }

        if (this.seconds < 10) {
            secs = "0" + this.seconds;
        } else {
            secs = this.seconds;
        }

        return `${hours}:${mins}:${secs}`;
    }
}