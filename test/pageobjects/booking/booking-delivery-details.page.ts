import { SelfPickupLocationMap, SelfPickupLocationMapInstance } from "../../../common/util/components/self-pickup-location-map.js";
import { WebdriverIOElement } from "../../../common/types/wdio.js";
import { DateTimePickerType } from "../../../common/types/enums.js";
import { DatePicker } from "../../../common/util/components/date-picker.js";
import { TimePicker } from "../../../common/util/components/time-picker.js";
import { Door2DoorMap, Door2DoorMapInstance } from "../../../common/util/components/door-to-door-map.js";

class BookingDeliveryDetailsPage {
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

    get editSelfPickupLocationButton(): WebdriverIOElement{
        return $('//div[@data-testid="cars-summary_delivery_edit-delivery-address_button"]');
    }

    get editSelfPickupDateTime(): WebdriverIOElement{
        // TODO 
        return $('');
    }

    get continueToAddonsButton(): WebdriverIOElement{
        return $('//button[@data-testid="cars_summary_desktop-car-price-break-down_continue-button"]');
    }

    get selfPickupLocationMap(): SelfPickupLocationMap{
        return  SelfPickupLocationMapInstance;
    }

    get door2DoorMap(): Door2DoorMap{
        return Door2DoorMapInstance;
    }

    get editDoor2DoorLocationDeliveryButton(): WebdriverIOElement{
        return $('//div[@data-testid="cars-summary_delivery_edit-delivery-address_button"]');
    }

    get editDoor2DoorLocationReturnButton(): WebdriverIOElement{
        return $('//div[@data-testid="cars-summary_return_edit-return-address_button"]');
    }



}

export default new BookingDeliveryDetailsPage();