import { RRule } from "./rrule.model";

export class Event {
    startDate: Date;
    endDate: Date;
    summary: string;
    rrule?: RRule;
    _data: Array<any>;

    constructor(dataArray: Array<any>) {
        this._data = dataArray;
        this.startDate = new Date(dataArray.filter(item => item[0] === 'dtstart')[0][3]);
        this.endDate = new Date(dataArray.filter(item => item[0] === 'dtend')[0][3]);
        this.summary = dataArray.filter(item => item[0] === 'summary')[0][3];
        
        const rruleDataArray = dataArray.filter(item => item[0] === 'rrule')[0];
        if (rruleDataArray) {
            this.rrule = new RRule(rruleDataArray[3]);
        }
    }

    occursBetween(fromDate: Date, toDate: Date): boolean {
        if (this.startDate < fromDate || this.endDate > toDate)
            return false;

        if (this.rrule) {
            if (this.rrule.freq === 'DAILY')
                return true;

            const now = new Date();
            const nowUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

            switch (this.rrule.freq) {
                default:
                    console.warn("Couldn't be bothered to support any more frequencies, sorry :D");

                case 'WEEKLY':
                    const todayICALDayStr = this.dayToICalDayStr(nowUTC.getDay());

                    // Not all ICALs specify the byday property, so we can take the day
                    // from the startDate property instead
                    if (!this.rrule.byday) {
                        if (this.startDate.getDay() === nowUTC.getDay()) {
                            return true;
                        }
                    }

                    if (this.rrule.byday == todayICALDayStr || (this.rrule.byday as string[]).includes(todayICALDayStr)) {
                        return true;
                    }
                        
                    break;
            }

            return false;
        }

        return true;
    }

    private dayToICalDayStr(day: number) {
        switch (day) {
            case 1: return 'MON';
            case 2: return 'TU';
            case 3: return 'WE';
            case 4: return 'TU';
            case 5: return 'FR';
            case 6: return 'SA';
            case 7: return 'SU';
            default: throw new Error(`${day} can not be parsed as an ICAL day string.`);
        }
    }
}