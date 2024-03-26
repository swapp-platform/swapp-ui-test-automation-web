import { POC } from "../../common/types/types";
import { WebdriverIOElement } from "../types/wdio";
import {getFormattedDateTimeAsString, getFormattedDayName, getFormattedMonthName, getFormattedTimeAsString, getFormattedDateTimePeriodAsString} from "../util/helper.js";

class Functions{
    private static instance: Functions;
    private constructor() { }

    public static getInstance(): Functions {
        if (!Functions.instance) {
            Functions.instance = new Functions();
        }

        return Functions.instance;
    }

    deliveryDateTime = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        console.log("deliveryDateTime");
        console.log(text);
        const expectedString = getFormattedDateTimeAsString(testCase.startDateTime); 
        //const expectedString = `${getFormattedDayName(testCase.startDateTime)}, ${getFormattedMonthName(testCase.startDateTime)} ${testCase.startDateTime.getDate()},\n ${testCase.startDateTime.getHours()}:${testCase.startDateTime.getMinutes()}`;
        console.log(expectedString);
        expect(text)
        .withContext("delivery time is not correct")
        .toEqual(expectedString);
        //.toEqual("Wed, Mar 26,\n 14:00");
        
    }
    doorToDoorDeliveryDateTime= async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("delivery time is not correct")
        .toEqual(getFormattedDateTimePeriodAsString(testCase.startDateTime));
        //.toEqual("Thu, Mar 26,\n 14:00 - 16:00");
        
    }
    

    returnDateTime = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        const expectedString = getFormattedDateTimeAsString(testCase.endDateTime); 

        //const expectedString = `${getFormattedDayName(testCase.endDateTime)}, ${getFormattedMonthName(testCase.endDateTime)} ${testCase.endDateTime.getDate()},\n ${testCase.endDateTime.getHours()}:${testCase.endDateTime.getMinutes()}`;
        expect(text)
        .withContext("return time is not correct")
        .toEqual(expectedString);
        //.toEqual("Wed, Mar 27,\n 14:00");

    }
    doorToDoorReturnDateTime= async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("Door to door Return date time is not correct")
        .toEqual(getFormattedDateTimePeriodAsString(testCase.endDateTime)); 
        //.toEqual("Thu, Mar 27,\n 14:00 - 16:00");
        
    }
    doorToDoorDeliveryPrice = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("Door to door Return date time is not correct")
        .toEqual("AED 10");
        //.toEqual(getFormattedDateAsString(testCase.startDateTime));
    }
    rentalPricePeriod = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("Rental Price period is not right!")
        .toEqual(`AED ${testCase.rentalFeePerDay}`);
    }
    rentalPricePerDay = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("Rental Price period is not right!")
        .toEqual(`AED ${testCase.rentalFeePerDay} / day`);
    }
    rentalPriceSummary = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("Total price is not correct!")
        .toEqual(`AED ${testCase.rentalFeePerDay}`); //multiplay with the booked days
    }
    CDWPricePeriod = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("CDW PRICE IS NOT CORRECT")
        .toEqual(`AED 10`);
        //.toEqual(`AED ${AddOnInsurance.CDW.price}`);
    }
    CDWPricePerDay = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("CDW PRICE PER DAY IS NOT CORRECT")
        .toEqual(`AED 10 / day`);
        //.toEqual(`AED ${AddOnInsurance.CDW.price}`);
    }
    secondaryDriverPricePeriod = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("Secondary driver price IS NOT CORRECT")
        .toEqual(`AED 35`);
        //.toEqual(`AED ${AddOnInsurance.CDW.price}`);
    }
    secondaryDriverPricePerDay = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("Secondary driver PRICE PER DAY IS NOT CORRECT")
        .toEqual(`AED 35 / day`);
        //.toEqual(`AED ${AddOnInsurance.CDW.price}`);
    }
    selfPickupDate = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        const expectedString = `${getFormattedDayName(testCase.startDateTime)}, ${getFormattedMonthName(testCase.startDateTime)} ${testCase.startDateTime.getDate()}`;
        expect(text)
        .withContext("Self Pickup Delivery Date is not correct!")
        .toEqual(expectedString);
        //.toEqual("Wed, Mar 26");
        
    }
    selfPickupTime = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        console.log("selfpickuptime");
        console.log(text);
        //const expectedString = `${testCase.startDateTime.getHours()}:${testCase.startDateTime.getMinutes()}`;
        const expectedString = getFormattedTimeAsString(testCase.startDateTime)
        console.log(expectedString);
        expect(text)
        .withContext("Self Pickup Delivery Date is not correct!")
        .toEqual(expectedString);
        //.toEqual("14:00");
    }
    selfPickupReturnDate = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        const expectedString = `${getFormattedDayName(testCase.endDateTime)}, ${getFormattedMonthName(testCase.endDateTime)} ${testCase.endDateTime.getDate()}`;
        expect(text)
        .withContext("Self Pickup Delivery Date is not correct!")
        .toEqual(expectedString);
        //.toEqual("Thu, Mar 27");
        
    }
    selfPickupReturnTime = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        //const expectedString = `${testCase.endDateTime.getHours()}:${testCase.endDateTime.getMinutes()}`;
        const expectedString = getFormattedTimeAsString(testCase.endDateTime);
        expect(text)
        .withContext("Self Pickup Delivery Date is not correct!")
        .toEqual(expectedString);
        //.toEqual("14:00");
        
    }





}

const Functionss = Functions.getInstance();




export class Assert{
    private static instance: Assert;
    private constructor() { }

    public static getInstance(): Assert {
        if (!Assert.instance) {
            Assert.instance = new Assert();
        }

        return Assert.instance;
    }


    
    public DeliveryDetailsPage = new class {
        deliveryDateTime = Functionss.deliveryDateTime;
        doorToDoorDeliveryDateTime = Functionss.doorToDoorDeliveryDateTime;
        doorToDoorReturnDateTime = Functionss.doorToDoorReturnDateTime;
        doorToDoorDeliveryPrice = Functionss.doorToDoorDeliveryPrice;
        returnDateTime = Functionss.returnDateTime;
        rentalPricePeriod = Functionss.rentalPricePeriod;
        rentalPricePerDay = Functionss.rentalPricePerDay;
        rentalPriceSummary = Functionss.rentalPriceSummary;

    }

    public AddonsPage = new class {
        deliveryDateTime = Functionss.deliveryDateTime;
        returnDateTime = Functionss.returnDateTime;
        rentalPricePeriod = Functionss.rentalPricePeriod;
        rentalPricePerDay = Functionss.rentalPricePerDay;
        rentalPriceSummary = Functionss.rentalPriceSummary;
        doorToDoorDeliveryPrice = Functionss.doorToDoorDeliveryPrice;
        CDWPricePeriod = Functionss.CDWPricePeriod;
        CDWPricePerDay = Functionss.CDWPricePerDay;
        secondaryDriverPricePeriod = Functionss.secondaryDriverPricePeriod;
        secondaryDriverPricePerDay = Functionss.secondaryDriverPricePerDay;
    }
    public OverviewPage = new class {
        selfPickupDate = Functionss.selfPickupDate;
        selfPickupTime = Functionss.selfPickupTime;
        selfPickupReturnDate = Functionss.selfPickupReturnDate;
        selfPickupReturnTime = Functionss.selfPickupReturnTime;

    }

    public HomePage = new class{
        selfPickupDate = Functionss.selfPickupDate;
        selfPickupReturnDate = Functionss.selfPickupReturnDate;
        selfPickupTime = Functionss.selfPickupTime;
        //selfPickupLocation

    }
}

export const AssertInstance = Assert.getInstance();

