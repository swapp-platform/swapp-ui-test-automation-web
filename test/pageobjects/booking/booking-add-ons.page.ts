import { RentalBreakdownPanel, RentalBreakdownPanelInstance } from "../../../common/util/components/rental-breakdown-panel.js";
import { AddOnInsurance, AddOnSecondaryDriver } from "../../../common/types/types.js";
import { WebdriverIOElement } from "../../../common/types/wdio.js";

class BookingAddOnsPage {
    get rentalBreakdownPanel(): RentalBreakdownPanel{
        return RentalBreakdownPanelInstance;
    }

    get insuraneComprehensive(): WebdriverIOElement{
        return $('//div[@data-testid="rental_car_add-on_normal-insurance-selected"] | //div[@data-testid="rental_car_add-on_normal-insurance"]');
    }

    get insuraneComprehensiveSelected(): WebdriverIOElement{
        return $('//div[@data-testid="rental_car_add-on_normal-insurance-selected"]');
    }

    get insuraneCDW(): WebdriverIOElement{
        return $('//div[@data-testid="rental_car_add-on_extra-insurance"] | //div[@data-testid="rental_car_add-on_extra-insurance-selected"]');
    }

    get insuraneCDWSelected(): WebdriverIOElement{
        return $('//div[@data-testid="rental_car_add-on_extra-insurance-selected"]');
    }

    get withoutSecondaryDriver(): WebdriverIOElement{
        return $('//div[@data-testid="rental_car_add-on_without-secondary-driver"] | //div[@data-testid="rental_car_add-on_without-secondary-driver-selected"]');
    }

    get withoutSecondaryDriverSelected(): WebdriverIOElement{
        return $('//div[@data-testid="rental_car_add-on_without-secondary-driver-selected"]');
    }

    get withSecondaryDriver(): WebdriverIOElement{
        return $('//div[@data-testid="rental_car_add-on_with-secondary-driver"] | //div[@data-testid="rental_car_add-on_with-secondary-driver-selected"]');
    }

    get withSecondaryDriverSelected(): WebdriverIOElement{
        return $('//div[@data-testid="rental_car_add-on_with-secondary-driver-selected"]');
    }
    
    get continueToPaymentButton(): WebdriverIOElement{
        return $('//button[@data-testid="cars_summary_desktop-car-price-break-down_continue-button"]');
    }

    setInsurance = async (addonInsurance: AddOnInsurance) : (Promise<void>) => {
        switch(addonInsurance) { 
            case AddOnInsurance.CDW: { 
               await this.insuraneCDW.click();
               break;
            } 
            case AddOnInsurance.COMPREHENSIVE: { 
                await this.insuraneComprehensive.click();
                break;
            } 
            case AddOnInsurance.NOTHING:{
                //do nothing, field is not visible
                break;
            }
            default: { 
                console.log(`CANNOT SET INSURANCE WITH VALUE ${addonInsurance} `);
                break; 
            } 
         } 
    }

    setSecondaryDriver = async (addonSecondaryDriver: AddOnSecondaryDriver) : (Promise<void>) => {
        switch(addonSecondaryDriver) { 
            case AddOnSecondaryDriver.WITH: { 
               await this.withSecondaryDriver.click();
               break;
            } 
            case AddOnSecondaryDriver.WITHOUT: { 
                await this.withoutSecondaryDriver.click();
                break;
            } 
            default: { 
                console.log(`CANNOT SET INSURANCE WITH VALUE ${addonSecondaryDriver} `);
                break; 
            } 
         } 
    }
}

export default new BookingAddOnsPage();