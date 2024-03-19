
import { DateTimePickerType } from "../../types/enums";
import { WebdriverIOElement } from "../../types/wdio";
import { BookingPeriodDate } from "../../types/types"

export class DatePicker {
    pickerXpath: String;
    constructor(pickerType : DateTimePickerType){
        this.pickerXpath = `//button[@data-testid="${pickerType}Date"]`;
    }

    get picker(): WebdriverIOElement{
        return $(`${this.pickerXpath}`)
    }

    calendarDayButton(monthAndDay: string): WebdriverIOElement{
        return $(`//button[@data-testid="${monthAndDay}"]`)
    }

    get selectedDayFirst(): WebdriverIOElement{
        return $(`//button[contains(@class, 'selectedDayFirst')]//button`)
        //div[@class='sc-fyZgVY jJsbyw']//*[contains(@class, 'selectedDayLast')]//button
    }
    get selectedDayLast(): WebdriverIOElement{
        return $(`//button[contains(@class, 'selectedDayLast')]//button`)
        //div[@class='sc-fyZgVY jJsbyw']//*[contains(@class, 'selectedDayLast')]//button
    }

    get saveChangesBUtton(): WebdriverIOElement{
        return $(`//button[@data-testid="apply-filter-button"]`)
    }

    setDate = async (from: BookingPeriodDate, to: BookingPeriodDate): (Promise<void>) => {
        await this.calendarDayButton(`${from.month}${from.day}`).click();
        await browser.pause(2000);
        await this.calendarDayButton(`${to.month}${to.day}`).click();
        await this.saveChangesBUtton.click();
    }


}