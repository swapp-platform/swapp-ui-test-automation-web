import { DatePicker } from "../../common/util/components/date-picker.js";
import { TimePicker } from "../../common/util/components/time-picker.js";
import { WebdriverIOElement} from "../../common/types/wdio";
import { DateTimePickerType } from "../../common/types/enums.js";

class CarDetailsPage {
    fromDate: DatePicker;
    toDate: DatePicker;
    fromTime: TimePicker;
    toTime: TimePicker;

    constructor (){
        this.fromDate = new DatePicker(DateTimePickerType.FROM)
        this.toDate = new DatePicker(DateTimePickerType.TO)
        this.fromTime = new DatePicker(DateTimePickerType.FROM)
        this.toTime = new DatePicker(DateTimePickerType.TO)
    }

    get termsAndConditionsCheckbox(): WebdriverIOElement{
        return $('//label[@data-testid="rental_car_tandc_checkbox"]');
    }

    get continueToBookingButton(): WebdriverIOElement{
        //TODO
        return $("//button[text()='Continue to booking']");
    }


}

export default new CarDetailsPage();
