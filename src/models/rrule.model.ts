export class RRule {
    freq: string;
    until: Date;
    interval: number;
    byday: string[] | string;
    wkst: number;

    constructor(obj: any) {
        this.freq = obj.freq;
        this.until = obj.until;
        this.interval = obj.interval;
        this.byday = obj.byday;
        this.wkst = obj.wkst;
    }
}