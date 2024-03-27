import { RentalBreakdownPanel, RentalBreakdownPanelInstance } from "../../../common/util/components/rental-breakdown-panel.js";
import { SelfPickupLocationMap, SelfPickupLocationMapInstance } from "../../../common/util/components/self-pickup-location-map.js";
import { WebdriverIOElement } from "../../../common/types/wdio.js";
import { DateTimePickerType } from "../../../common/types/enums.js";
import { DatePicker } from "../../../common/util/components/date-picker.js";
import { TimePicker } from "../../../common/util/components/time-picker.js";
import { Door2DoorMap, Door2DoorMapInstance } from "../../../common/util/components/door-to-door-map.js";
import {AddOnInsurance, AddOnSecondaryDriver, DeliverOption, POC} from "../../../common/types/types.js";
import {daysBetweenDates} from "../../../common/util/helper.js";

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

    get selfPickupTitle(): WebdriverIOElement{
        return $(`//h1[text()='Self pickup']`);
    }

    get rentalBreakdownPanel(): RentalBreakdownPanel{
        return RentalBreakdownPanelInstance;
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

    get selfPickupLocationTitle(): WebdriverIOElement{
        //TODO
        return $('//h4[text()="Burj Kalifa tower"]');
    }

    get doorToDoorDeliveryLocationTitle(): WebdriverIOElement{
        //TODO
        return $('(//h4[text()="Burj Khalifa - Sheikh Mohammed bin Rashid Boulevard"])[1]')
    }

    get doorToDoorReturnLocationTitle(): WebdriverIOElement{
        return $('(//h4[text()="Burj Khalifa - Sheikh Mohammed bin Rashid Boulevard"])[2]')
    }

    calculateSummary(testCase: POC) : number {
        //WATCH OUT FOR THIS, FRAGILE!!!
        const bookedDays = daysBetweenDates(testCase.startDateTime, testCase.endDateTime);
        
        const rentalPrice = testCase.car.rentalFeePerDay * bookedDays;
        let CDWPrice = 0;
        let SecondaryDriverPrice = 0;
        let doorToDoorPrice = testCase.deliveryDetailsPageOptions.deliveryOption == DeliverOption.DOOR_TO_DOOR ? 10 : 0;
        if(testCase.addonPageOptions.insurance != undefined && testCase.addonPageOptions.insurance == AddOnInsurance.CDW){
            CDWPrice = testCase.car.CDWprice * bookedDays;
        }
        if(testCase.addonPageOptions.secondaryDriver != undefined && testCase.addonPageOptions.secondaryDriver == AddOnSecondaryDriver.WITH){
            SecondaryDriverPrice = 35 * bookedDays;
        }

        console.log("KALKULACIOK")
        console.log(bookedDays);
        console.log(rentalPrice);
        console.log(CDWPrice);
        console.log(SecondaryDriverPrice);
        console.log(doorToDoorPrice);

        return rentalPrice + CDWPrice + SecondaryDriverPrice + doorToDoorPrice;
    };

}

export default new BookingDeliveryDetailsPage();