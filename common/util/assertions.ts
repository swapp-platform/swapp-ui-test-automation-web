import { POC } from "../../common/types/types";
import { WebdriverIOElement } from "../types/wdio";

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
        expect(text)
        .withContext("delivery time is not correct")
        .toEqual("Fri, Mar 22,\n 14:00");
        //.toEqual(getFormattedDateAsString(testCase.startDateTime));
    }

    returnDateTime = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        console.log("returnDateTime expect");
        console.log(text);
        expect(text)
        .withContext("return time is not correct")
        .toEqual("Sat, Mar 23,\n 14:00");
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
        expect(text)
        .withContext("Self Pickup Delivery Date is not correct!")
        .toEqual("Fri, Mar 22");
        //.toEqual(`AED ${AddOnInsurance.CDW.price}`);
    }
    selfPickupTime = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("Self Pickup Delivery Date is not correct!")
        .toEqual("14:00");
        //.toEqual(`AED ${AddOnInsurance.CDW.price}`);
    }
    selfPickupReturnDate = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        expect(text)
        .withContext("Self Pickup Delivery Date is not correct!")
        .toEqual("Sat, Mar 23");
        //.toEqual(`AED ${AddOnInsurance.CDW.price}`);
    }
    selfPickupReturnTime = async (text: String, testCase: POC) : (Promise<void>) =>{ 
        console.log(text);
        expect(text)
        .withContext("Self Pickup Delivery Date is not correct!")
        .toEqual("14:00");
        //.toEqual(`AED ${AddOnInsurance.CDW.price}`);
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

