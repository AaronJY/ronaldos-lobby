import { Event } from "./event.model";

const calendarDataIndex = 1;
const eventDataIndex = 2;

export class Calendar {
    name: string;
    events: Event[];

    constructor(data: any) {
        this.name = (data[calendarDataIndex] as Array<Array<any>>)
            .filter((element: Array<any>) => element[0] === 'x-wr-calname')[0][3];

        this.events = (data[eventDataIndex] as Array<Array<any>>)
            .filter((element: Array<any>) => element[0] === "vevent")
            .map((eventDataArray: Array<any>) => new Event(eventDataArray[1]));
    }
}