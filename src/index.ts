import { CalenderService } from "./services/calendar.service";
import { Calendar } from "./models/calendar.model";
import { Event } from "./models/event.model";

import calendars from "./calendars";

class App {
    static async init() {
        const today: Date = this.getTodayMidnight();
        const tomorrow: Date = this.getTomorrowMidnight();

        const events = (await CalenderService.getCalendars(calendars))
            .map((calendar: Calendar) => {
                return calendar.events.filter((event: Event) => {
                    return event.occursBetween(today, tomorrow);
                });
            });
        
        console.log([].concat.apply(events[0]));
    }

    private static getTodayMidnight(): Date {
        const now: Date = new Date();
        return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    }

    private static getTomorrowMidnight(): Date {
        const now: Date = new Date();
        return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1));
    }
}

App.init();