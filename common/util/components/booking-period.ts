
import { DateTimePickerType } from "../../types/enums";
import { WebdriverIOElement } from "../../types/wdio";
import { DatePicker } from "./date-picker";

export class BookingPeriod{
    fromDate: DatePicker;
    toDate: DatePicker
    constructor(){
        this.fromDate = new DatePicker(DateTimePickerType.FROM);
        this.toDate = new DatePicker(DateTimePickerType.TO);
    }

   
}