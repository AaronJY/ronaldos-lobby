const ICAL = require("ical.js");

import axios from "axios";
import { Calendar } from "../models/calendar.model";

export class CalenderService {
    static async getCalendars(calendars: string[]) {
        const promises: Promise<Calendar>[] = calendars.map(async (calendarUri: string) => {
            const data = await this.fetchCalendarData(calendarUri);
            const ical = await ICAL.parse(data);
            console.log(ical);
            return new Calendar(ical);
        });
        
        return await Promise.all(promises);
    }

    private static async fetchCalendarData(calendarUri: string) {
        console.log(`Getting data for ${calendarUri}`);
        const response = await axios.get(calendarUri, {   });
        return response.data;
    }
}