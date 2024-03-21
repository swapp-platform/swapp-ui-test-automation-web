import { WebdriverIOElement } from "../../../common/types/wdio.js";
import { RentalBreakdownPanel, RentalBreakdownPanelInstance } from "../../../common/util/components/rental-breakdown-panel.js";

class BookingPaymentPage {

    get rentalBreakdownPanel(): RentalBreakdownPanel{
        return RentalBreakdownPanelInstance;
    }
    
    get bookCarButton(): WebdriverIOElement{
        return $('//div[@data-testid="cars_summary_desktop-car-price-break-down_continue-button"]');
    }

}

export default new BookingPaymentPage();