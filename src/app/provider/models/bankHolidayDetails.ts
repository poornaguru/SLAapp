export class BankHolidayDetails {
   bankHoliday: BankHolidayData[];
   bankHolidayOpen: BankHolidayData[];
   bankHolidayClose: BankHolidayData[];
   bankHolidayClosed: BankHolidayData[];
}

export class BankHolidayData {
   id: string;
   text: string;


}

export class BankHolidayEnabled {
   checkHolidayDays: boolean;
   holidayCounter: number;
   individualMessages: boolean;
   id: string;
}