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
}