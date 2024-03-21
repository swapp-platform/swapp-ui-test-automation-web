import { WebdriverIOElement } from "../../../common/types/wdio.js";

class BookingSuccesCheckoutPage {
    get checkYourBookingButton(): WebdriverIOElement{
        return $("//button[text()='Check your booking']");
    }

}

export default new BookingSuccesCheckoutPage();