import {getDate} from "../util/helper.js";

type BookingTestCase = {
    carId : number;
    rentalFeePerDay: number;
    fromDate: BookingPeriodDate;
    endDate: BookingPeriodDate;
    startTime: string;
    endTime: string;
    //-- Delivery details
    
    deliveryOption: DeliverOption
    selfPickupLocation?: String //here ? needed, because deliveryOption can be D2D. If Delivery Option is DEFAULT or SELF_PICKUP, this field is always needed
    selfPickupDateTime?: BookingPeriod
    selfPickupReturnDateTime?: BookingPeriod;

    doorToDoorLocation?: String
    doorToDoorDateTime?: BookingPeriod
    doorToDoorReturnLocation?: String
    doorToDoorReturnDateTime?: BookingPeriod

    //--Addons
    insurance?: AddOnInsurance
    secondaryDriver?: AddOnSecondaryDriver
    
}

export type POC = {
    isIncluded: boolean;
    isHappyPath: boolean;
    testCase: string;
    carId : number;
    rentalFeePerDay: number;
    startDateTime: Date;
    endDateTime: Date;
    startTime?: string;
    endTime?: string;
    //-- Delivery details
    deliveryDetailsPageOptions: DeliveryDetailsPageOptions;
    //--Addons
    addonPageOptions: AddonPageOptions;
    paymentPageOptions: PaymentPageOptions;
    
}



export enum AddOnInsurance {
    COMPREHENSIVE = "COMPREHENSIVE",
    CDW = "CDW",
    NOTHING = "NOTHING"
}

export enum AddOnSecondaryDriver {
    WITHOUT = "Without secondary driver",
    WITH = "Include secondary driver"
}

export enum DeliverOption {
    DEFAULT = "DEFAULT", // = ONLY self pickup is available
    SELF_PICKUP = "SELF_PICKUP",
    DOOR_TO_DOOR = "DOOR_TO_DOOR",
}

export type BookingPeriodDate= {
    month: String;
    day: number;
}

export type BookingPeriod={
    bookingPeriodDate: BookingPeriodDate
    startTime: string
    endTime: string

}

export type VisibilityObject = {
    waitForDisplayedTimeout: number
    pauseTime: number
}

export type ContactField = {
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    whatsappNumber: string
}

export type DeliveryDetailsPageOptions = {
    deliveryOption: DeliverOption
    contact?: ContactField 
    deliveryDetails: SelfPickupDeliveryDetails | DoorToDoorDeliveryDetails
}

export type SelfPickupDeliveryDetails = {
    selfPickupLocation?: String //here ? needed, because deliveryOption can be D2D. If Delivery Option is DEFAULT or SELF_PICKUP, this field is always needed
    selfPickupDateTime?: BookingPeriod
    selfPickupReturnDateTime?: BookingPeriod;
}

export type DoorToDoorDeliveryDetails = {
    doorToDoorLocation?: String
    doorToDoorDateTime?: BookingPeriod
    doorToDoorReturnLocation?: String
    doorToDoorReturnDateTime?: BookingPeriod
}

export type AddonPageOptions = {
    insurance?: AddOnInsurance 
    secondaryDriver?: AddOnSecondaryDriver
}

export type PaymentPageOptions = {
    cardDetails?: CardDetails
    billingDetails?: BillingDetails
}

export type CardDetails = {
    cardNumber: number
    expiration: String
    cvv: number
}

export type BillingDetails = {
    billingName: String
    addressLine1: String
    addressLine2: String
    state: String
    zip: number
    city: String
    country: String
}

export const pocCase1: POC[] = [
    {
        testCase: "SW-38",
        carId: 17,
        isIncluded: true,
        isHappyPath: true,
        rentalFeePerDay: 80,
        startDateTime: getDate(2024,3,28, 14,0,0), //could be improved with tomorrow()
        endDateTime: getDate(2024,3,29, 14,0,0),
        deliveryDetailsPageOptions: {
            deliveryOption: DeliverOption.DEFAULT,
            deliveryDetails: {
                selfPickupLocation: "asd",
            }
        },
        addonPageOptions: {
            insurance: AddOnInsurance.CDW,
            secondaryDriver: AddOnSecondaryDriver.WITH
        },
        paymentPageOptions: {

        }
    },
    {
        testCase: "SW-34",
        carId: 17,
        isIncluded: true,
        isHappyPath: true,
        rentalFeePerDay: 80,
        startDateTime: getDate(2024,3,28, 14,0,0), //could be improved with tomorrow()
        endDateTime: getDate(2024,3,29, 14,0,0),
        deliveryDetailsPageOptions: {
            deliveryOption: DeliverOption.DEFAULT,
            deliveryDetails: {
                selfPickupLocation: "asd",
            }
        },
        addonPageOptions: {
            insurance: AddOnInsurance.COMPREHENSIVE,
            secondaryDriver: AddOnSecondaryDriver.WITH
        },
        paymentPageOptions: {

        }
    },
    {
        testCase: "SW-10",
        carId: 17,
        isIncluded: true,
        isHappyPath: true,
        rentalFeePerDay: 80,
        startDateTime: getDate(2024,3,28, 14,0,0), //could be improved with tomorrow()
        endDateTime: getDate(2024,3,29, 14,0,0),
        deliveryDetailsPageOptions: {
            deliveryOption: DeliverOption.DEFAULT,
            deliveryDetails: {
                selfPickupLocation: "asd",
            }
        },
        addonPageOptions: {
            insurance: AddOnInsurance.COMPREHENSIVE,
            secondaryDriver: AddOnSecondaryDriver.WITHOUT
        },
        paymentPageOptions: {

        }
    },
    {
        testCase: "SW-36",
        carId: 17,
        isIncluded: true,
        isHappyPath: true,
        rentalFeePerDay: 80,
        startDateTime: getDate(2024,3,28, 14,0,0), //could be improved with tomorrow()
        endDateTime: getDate(2024,3,29, 14,0,0),
        deliveryDetailsPageOptions: {
            deliveryOption: DeliverOption.DEFAULT,
            deliveryDetails: {
                selfPickupLocation: "asd",
            }
        },
        addonPageOptions: {
            insurance: AddOnInsurance.CDW,
            secondaryDriver: AddOnSecondaryDriver.WITHOUT
        },
        paymentPageOptions: {

        }
    },
    {
        testCase: "SW-174",
        carId: 18,
        isIncluded: true,
        isHappyPath: true,
        rentalFeePerDay: 95,
        startDateTime: getDate(2024,3,28, 14,0,0), //could be improved with tomorrow()
        endDateTime: getDate(2024,3,29, 14,0,0),
        deliveryDetailsPageOptions: {
            deliveryOption: DeliverOption.DOOR_TO_DOOR,
            deliveryDetails: {
                doorToDoorLocation: "Burj k",
            }
        },
        addonPageOptions: {
            insurance: AddOnInsurance.COMPREHENSIVE,
            secondaryDriver: AddOnSecondaryDriver.WITHOUT
        },
        paymentPageOptions: {

        }
    },
    //{
    //    carId: 17,
    //    isIncluded: true,
    //    isHappyPath: true,
    //    rentalFeePerDay: 80,
    //    fromDate: {month: "March", day: 25},
    //    endDate: {month: "March", day: 28},
    //    startTime : "10:00:00",
    //    endTime: "14:00:00",
    //    deliveryDetailsPageOptions: {
    //        deliveryOption: DeliverOption.DEFAULT,
    //        deliveryDetails: {
    //            selfPickupLocation: "asd",
    //        }
    //    },
    //    addonPageOptions: {
    //        insurance: AddOnInsurance.CDW,
    //        secondaryDriver: AddOnSecondaryDriver.WITH
    //    },
    //    paymentPageOptions: {
//
    //    }
//
    //}
]



export const Case1: BookingTestCase[]= [
    {
        carId: 17,
        rentalFeePerDay: 80,
        fromDate: {month: "March", day: 25},
        endDate: {month: "March", day: 28},
        startTime : "10:00:00",
        endTime: "14:00:00",
        //
        deliveryOption: DeliverOption.DEFAULT,
        selfPickupLocation:"asd",
        // selfPickupDateTime
        // selfPickupDateTime

        insurance: AddOnInsurance.CDW,
        secondaryDriver: AddOnSecondaryDriver.WITH,

    },
    {
        carId: 20,
        rentalFeePerDay: 80,
        fromDate: {month: "March", day: 25},
        endDate: {month: "March", day: 28},
        startTime : "10:00:00",
        endTime: "14:00:00",
        //
        deliveryOption: DeliverOption.DOOR_TO_DOOR,
        doorToDoorLocation: "Burj",
        // selfPickupDateTime
        // selfPickupDateTime

        insurance: AddOnInsurance.NOTHING,
        secondaryDriver: AddOnSecondaryDriver.WITH
    },
]