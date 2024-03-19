import { WebdriverIOElement } from "../../../common/types/wdio.js";

class BookingPaymentPage {
    get bookCarButton(): WebdriverIOElement{
        return $('//div[@data-testid="cars_summary_desktop-car-price-break-down_continue-button"]');
    }

}

export default new BookingPaymentPage();