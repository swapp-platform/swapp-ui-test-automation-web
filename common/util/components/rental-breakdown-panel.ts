import { WebdriverIOElement } from "../../types/wdio";

export class RentalBreakdownPanel{
    private static instance: RentalBreakdownPanel;
    private constructor() { }
    public static getInstance(): RentalBreakdownPanel {
        if (!RentalBreakdownPanel.instance) {
            RentalBreakdownPanel.instance = new RentalBreakdownPanel();
        }

        return RentalBreakdownPanel.instance;
    }
   

    get deliveryDateTime(): WebdriverIOElement{
        //TODO ne törjön szét mert egy szenvedés lesz belőle
        return $(`//div[@data-testid="cars_summary_desktop-car-price-break-down_delivery-date"]`);
    }

    get returnDateTime(): WebdriverIOElement{
        return $(`//div[@data-testid="cars_summary_desktop-car-price-break-down_return-date"]`);
    }

    get rentalPricePeriod(): WebdriverIOElement{
        return $(`//h4[@data-testid="cars_summary_price-break-down_price-text"]`);
        //TODO datatestid szolgáltatásnak megfelelően (door-to-door, rental period...)
    }

    get rentalPricePerDay(): WebdriverIOElement{
        // TODO 
        return $(`(//h4[@data-testid="cars_summary_price-break-down_price-text"]//..//../p)[2]`);
    }

    get doorToDoorDelivery(): WebdriverIOElement{
        return $(`//h4[text()='Price breakdown']//parent::div//p[text()='Door-to-door delivery']//following-sibling::h4`);
        //TODO datatestid szolgáltatásnak megfelelően (door-to-door, rental period...)
    }

    get secondaryDriverPricePeriod(): WebdriverIOElement{
        return $(`//h4[text()='Price breakdown']//parent::div//p[text()='Secondary driver']//following-sibling::h4`);
        //TODO datatestid szolgáltatásnak megfelelően (door-to-door, rental period...)
    }

    get secondaryDriverPricePerDay(): WebdriverIOElement{
        // TODO 
        return $(`(//h4[text()='Price breakdown']//parent::div//p[text()='Secondary driver']//following-sibling::h4//..//../p)[2]`);
    }

    get CDWPricePeriod(): WebdriverIOElement{
        return $(`//h4[text()='Price breakdown']//parent::div//p[text()='CDW']//following-sibling::h4`);
        //TODO datatestid szolgáltatásnak megfelelően (door-to-door, rental period...)
    }

    get CDWPricePerDay(): WebdriverIOElement{
        // TODO 
        return $(`(//h4[text()='Price breakdown']//parent::div//p[text()='CDW']//following-sibling::h4//..//../p)[2]`);
    }

    get rentalPriceSummary(): WebdriverIOElement{
        return $(`//h1[@data-testid="cars_summary_price-break-down_total-price"]`);
    }


}

export const RentalBreakdownPanelInstance = RentalBreakdownPanel.getInstance();