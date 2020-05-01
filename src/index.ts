import { CalenderService } from "./services/calendar.service";
import { Calendar } from "./models/calendar.model";
import { Event } from "./models/event.model";

import calendars from "./calendars";
import { EventViewModel } from "./models/event.viewmodel";

class App {
    static async init() {
        const today: Date = this.getTodayMidnight();
        const tomorrow: Date = this.getTomorrowMidnight();

        // Think of something cleaner than just calling flat()
        const events = (await CalenderService.getCalendars(calendars))
            .map((calendar: Calendar) => calendar.events
                .filter((event: Event) => event.occursBetween(today, tomorrow))
                .map((event: Event) => {
                    return {
                        calendarName: calendar.name,
                        startDate: event.startDate,
                        endDate: event.endDate,
                        summary: event.summary
                    } as EventViewModel
                })
            ).flat();
        
        console.log(events);
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