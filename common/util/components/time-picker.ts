
import { DateTimePickerType } from "../../types/enums";
import { WebdriverIOElement } from "../../types/wdio";

export class TimePicker{
    pickerXpath: String;
    constructor(pickerType : DateTimePickerType){
        this.pickerXpath = `//button[@data-testid="${pickerType}Time"]`;
    }

    get picker(): WebdriverIOElement{
        return $(`${this.pickerXpath}`)
    }
}