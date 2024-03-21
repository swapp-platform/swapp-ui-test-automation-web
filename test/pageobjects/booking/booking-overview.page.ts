import { RentalBreakdownPanel, RentalBreakdownPanelInstance } from "../../../common/util/components/rental-breakdown-panel.js";
import { SelfPickupLocationMap, SelfPickupLocationMapInstance } from "../../../common/util/components/self-pickup-location-map.js";
import { WebdriverIOElement } from "../../../common/types/wdio.js";
import { DateTimePickerType } from "../../../common/types/enums.js";
import { DatePicker } from "../../../common/util/components/date-picker.js";
import { TimePicker } from "../../../common/util/components/time-picker.js";
import { Door2DoorMap, Door2DoorMapInstance } from "../../../common/util/components/door-to-door-map.js";
import {AddOnInsurance, AddOnSecondaryDriver, POC} from "../../../common/types/types.js";
import {daysBetweenDates} from "../../../common/util/helper.js";

class BookingOverviewPage {

    get selfPickupDate(): WebdriverIOElement{
        return $("(//h1[text()='Self Pickup']//following-sibling::div//h4)[1]");
    }

    get selfPickupTime(): WebdriverIOElement{
        return $("(//h1[text()='Self Pickup']//following-sibling::div//p)[1]");
    }

    get selfPickupReturnDate(): WebdriverIOElement{
        return $("(//h1[text()='Return']//following-sibling::div//h4)[1]");
    }

    get selfPickupReturnTime(): WebdriverIOElement{
        return $("(//h1[text()='Return']//following-sibling::div//p)[2]");
    }

    get bookingId(): WebdriverIOElement{
        return $("//span[@data-testid='booking_booking-id']");
    }


}

export default new BookingOverviewPage();