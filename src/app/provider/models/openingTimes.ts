export class OpeningTimes {
    enableTimeOfDaySettings: boolean;
    id: string;
    openingTimesData: OpeningTimesData[];
}

export class OpeningTimesData {
    day: string;
    start: string;
    end: string;
    closed: boolean;
    overflow: boolean;
    overflowEnd: string;
    route: boolean;
    csq: string;
}