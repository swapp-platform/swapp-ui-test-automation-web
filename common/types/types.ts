
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
        secondaryDriver: AddOnSecondaryDriver.WITH
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