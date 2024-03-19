import { EnvironmentVariables } from '../../config/environment-variables.js';

import {API} from '../../common/api/api.js';
import { CarCard } from '../../common/util/components/car-card.js';
import CarDetailsPage from '../pageobjects/car-details.page.js';
import BookingDeliveryDetailsPage from "../pageobjects/booking/booking-delivery-details.page.js";
import BookingAddonsPage from "../pageobjects/booking/booking-add-ons.page.js";
import BookingPaymentPage from "../pageobjects/booking/booking-payment.page.js";
import {Case1, pocCase1, DeliverOption, SelfPickupDeliveryDetails, DoorToDoorDeliveryDetails} from "../../common/types/types.js";
import {VisibilityObject} from "../../common/types/types.js";


pocCase1.forEach( (testCase) => {
    var car:CarCard;

    describe('Create the booking on USER side =>', () => {

        beforeAll(async () => {
            await browser.url(EnvironmentVariables.joinswapp_url);
            await API.LoginWithAPI();
            await browser.url(EnvironmentVariables.joinswapp_url);
        });


        it('Daily HOME - select the car', async () => {
            car = new CarCard(testCase.carId);
            await car.card.visiblityClick();
        });

        it('Car details - ', async () => {
            await CarDetailsPage.termsAndConditionsCheckbox.visiblityClick( {waitForDisplayedTimeout : 4000, pauseTime : 4000});
            await CarDetailsPage.continueToBookingButton.visiblityClick();

        });

        it("DeliveryDetailsPage - ", async () => {


            if(testCase.deliveryDetailsPageOptions.deliveryOption == DeliverOption.DEFAULT || testCase.deliveryDetailsPageOptions.deliveryOption == DeliverOption.SELF_PICKUP){
                const details = testCase.deliveryDetailsPageOptions.deliveryDetails as SelfPickupDeliveryDetails;
                if(details.selfPickupLocation!= undefined){
                    //change location
                    console.log("HEUHEUHEHUU")
                }

                if(details.selfPickupDateTime == undefined){
                    //change pickup time
                    console.log("ez is mukodik")
                }

                if(details.selfPickupReturnDateTime != undefined){
                    //change return time
                }

               

            } else if(testCase.deliveryDetailsPageOptions.deliveryOption == DeliverOption.DOOR_TO_DOOR){
                const details = testCase.deliveryDetailsPageOptions.deliveryDetails as DoorToDoorDeliveryDetails;
                if(details.doorToDoorLocation!= undefined){
                    //change location
                }

                if(details.doorToDoorDateTime != undefined){
                    //change pickup time
                }

                if(details.doorToDoorReturnLocation != undefined){
                    //change return location
                }

                if(details.doorToDoorReturnDateTime != undefined){
                    //change return date time
                }
            }


            // check Booking period
                // - Delivery (Date)
                // - Return (Date)
            // check Price brakdown 
                // - Rental period
                    // - X/day
            // check Summary
                // - Total for X days (String with number)
                // - Total price (Number)
            await BookingDeliveryDetailsPage.continueToAddonsButton.visiblityClick();


        });

        it('Addons Page - ', async () => {
            if (testCase.addonPageOptions.insurance != undefined){
                await BookingAddonsPage.setInsurance(testCase.addonPageOptions.insurance);
            }

            if (testCase.addonPageOptions.secondaryDriver != undefined){
                await BookingAddonsPage.setSecondaryDriver(testCase.addonPageOptions.secondaryDriver);
            }

            await BookingAddonsPage.continueToPaymentButton.click();
            // check Booking period
                // - Delivery (Date)
                // - Return (Date)
            // check Price brakdown 
                // - Rental period
                    // - X/day
                // - Insurance          <-----
                    // - X/day          <-----
                // - Secondary driver   <-----
                    // - X/day          <-----
            // check Summary
                // - Total for X days (String with number)
                // - Total price (Number)

        });

        // this needs some happyness checking as well
        it('Payment details Page - ', async () => {
            if (testCase.paymentPageOptions.cardDetails != undefined){
               // set custom payment details 
               // Note: What if user already has card details filled out? 
            }

            if (testCase.paymentPageOptions.billingDetails != undefined){
               // set custom payment details
                // Note: What if user already has billing details filled out? 

            }

        });

        // if testase is happyPath
        it('Check confirmation screen - ', async () => {
                // Self Pickup
                    // - date
                    // - location (save it when selecting)

                // Return 
                    // - Date
                    // - location

                // Supplier opening hours


                // Payment details
                    // Price breakdown
        });

        it('Check banner on home screen - ', async () => {

        });


        it('Check admin - ', async () => {

            //await API.LoginToADMIN();
            await browser.url("https://qa.joinswapp.com/rental-admin/users/?pageSize=10");
            //await browser.pause(20000);

            // check / Users / booking history

            // check reservations / 3 tabs

            // deliveries on given date

            // / suppliers???





        });

        
        afterAll(async () => {
            // delete everything 
        });
        
    })

});