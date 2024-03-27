import { WebdriverIOElement } from "../../../common/types/wdio.js";

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

    get doorToDoorDeliveryDate(): WebdriverIOElement{
        return $("(//h1[text()='Delivery']//following-sibling::div//h4)[1]");
    }

    get doorToDoorDeliveryTimeperiod(): WebdriverIOElement{
        return $("(//h1[text()='Delivery']//following-sibling::div//p)[1]");
    }

    get doorToDoorReturnDate(): WebdriverIOElement{
        return $("(//h1[text()='Return']//following-sibling::div//h4)[1]");
    }

    get doorToDoorReturnTimeperiod(): WebdriverIOElement{
        return $("(//h1[text()='Return']//following-sibling::div//p)[2]");
    }



}

export default new BookingOverviewPage();