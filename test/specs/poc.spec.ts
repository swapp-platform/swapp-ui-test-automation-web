import { EnvironmentVariables } from '../../config/environment-variables.js';

import {API} from '../../common/api/api.js';
import { CarCard } from '../../common/util/components/car-card.js';
import CarDetailsPage from '../pageobjects/car-details.page.js';
import BookingDeliveryDetailsPage from "../pageobjects/booking/booking-delivery-details.page.js";
import BookingAddonsPage from "../pageobjects/booking/booking-add-ons.page.js";
import BookingPaymentPage from "../pageobjects/booking/booking-payment.page.js";
import {Case1, pocCase1, DeliverOption, SelfPickupDeliveryDetails, DoorToDoorDeliveryDetails, AddOnInsurance, AddOnSecondaryDriver} from "../../common/types/types.js";
import {VisibilityObject} from "../../common/types/types.js";
import {getFormattedDateAsString} from "../../common/util/helper.js";

pocCase1
    .filter( (testCase) => testCase.isIncluded == true)
    .forEach( (testCase) => {
    var car:CarCard;

    describe('Create the booking on USER side =>', () => {

        beforeAll(async () => {
            await browser.url(EnvironmentVariables.joinswapp_url);
            // https://qa.joinswapp.com/rental/en-DXB/dubai/cars/?from=2024-03-15T13%3A00%3A00.000Z&to=2024-03-16T13%3A00%3A00.000Z&productType=DAILY
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

        describe("DeliveryDetailsPage =>  ",  () => {


            if(testCase.deliveryDetailsPageOptions.deliveryOption == DeliverOption.DEFAULT || testCase.deliveryDetailsPageOptions.deliveryOption == DeliverOption.SELF_PICKUP){
                const details = testCase.deliveryDetailsPageOptions.deliveryDetails as SelfPickupDeliveryDetails;
                if(details.selfPickupLocation!= undefined){
                    //change location
                    it('Change location', async () => {
                        await BookingDeliveryDetailsPage.editSelfPickupLocationButton.visiblityClick();
                        await browser.pause(2000);
                        await BookingDeliveryDetailsPage.selfPickupLocationMap.confirmPickupLocation.click();
                        await browser.pause(2000);

                        //await BookingDeliveryDetailsPage.selfPickupLocationMap.getLocation(details.selfPickupLocation!);
                        //await BookingDeliveryDetailsPage.selfPickupLocationMap.confirmPickupLocation.click();

                        expect(await BookingDeliveryDetailsPage.selfPickupLocationTitle.getText())
                            .withContext('Self pickup location is not correct')
                            .toEqual("Burj Kalifa tower");

                    });
                }

                if(details.selfPickupDateTime == undefined){
                    //change pickup time
                    console.log("ez is mukodik")
                }

                if(details.selfPickupReturnDateTime != undefined){
                    //change return time
                }

               

            } 
            else if(testCase.deliveryDetailsPageOptions.deliveryOption == DeliverOption.DOOR_TO_DOOR){
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


            it('make assertions', async () => {

                // check book period
                expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.deliveryDateTime.getText())
                .withContext("delivery time is not correct")
                .toEqual("Fri, Mar 22,\n 14:00");
                //.toEqual(getFormattedDateAsString(testCase.startDateTime));

                expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.returnDateTime.getText())
                .withContext("delivery time is not correct")
                .toEqual("Sat, Mar 23,\n 14:00");
                

                // check price breakdown
                expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.rentalPricePeriod.getText())
                .withContext("Rental Price period is not right!")
                .toEqual(`AED ${testCase.rentalFeePerDay}`);

                expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.rentalPricePerDay.getText())
                .withContext("Rental Price period is not right!")
                .toEqual(`AED ${testCase.rentalFeePerDay} / day`);

                // summary
                expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.rentalPriceSummary.getText())
                .withContext("Total price is not correct!")
                .toEqual(`AED ${testCase.rentalFeePerDay}`);

                
                
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
        });


        describe('Addons Page - ', () => {
            if (testCase.addonPageOptions.insurance != undefined && testCase.addonPageOptions.insurance != AddOnInsurance.NOTHING){
                it('Set insurance', async () => {
                    await BookingAddonsPage.setInsurance(testCase.addonPageOptions.insurance!);
                    
                    switch(testCase.addonPageOptions.insurance){
                        case AddOnInsurance.CDW:
                            expect(await BookingAddonsPage.insuraneCDWSelected.isDisplayed())
                            .withContext("CDW is not highlighted!")
                            .toBeTrue();
                            break;
                        case AddOnInsurance.COMPREHENSIVE:
                            expect(await BookingAddonsPage.insuraneComprehensiveSelected.isDisplayed())
                            .withContext("Comprehensive is not highlighted!")
                            .toBeTrue();
                            break;
                    }
                });
            }

            if (testCase.addonPageOptions.insurance != undefined && testCase.addonPageOptions.insurance != AddOnInsurance.NOTHING){
                it('Set Secondary driver', async () => {
                    await BookingAddonsPage.setSecondaryDriver(testCase.addonPageOptions.secondaryDriver!);
                    
                    switch(testCase.addonPageOptions.secondaryDriver){
                        case AddOnSecondaryDriver.WITH:
                            expect(await BookingAddonsPage.withSecondaryDriverSelected.isDisplayed())
                            .withContext("With Secondary driver is not highlighted!")
                            .toBeTrue();
                            break;
                        case AddOnSecondaryDriver.WITHOUT:
                            expect(await BookingAddonsPage.withoutSecondaryDriverSelected.isDisplayed())
                            .withContext("Without Secondary Driver is not highlighted!")
                            .toBeTrue();
                            break;
                    }
                });
            }

            it('make assertions', async () => {

                // check book period
                expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.deliveryDateTime.getText())
                .withContext("delivery time is not correct")
                .toEqual("Fri, Mar 22,\n 14:00");

                expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.returnDateTime.getText())
                .withContext("delivery time is not correct")
                .toEqual("Sat, Mar 23,\n 14:00");
                

                // check price breakdown
                expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.rentalPricePeriod.getText())
                .withContext("Rental Price period is not right!")
                .toEqual(`AED ${testCase.rentalFeePerDay}`);

                expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.rentalPricePerDay.getText())
                .withContext("Rental Price period is not right!")
                .toEqual(`AED ${testCase.rentalFeePerDay} / day`);

                await browser.pause(10000);
                if(testCase.addonPageOptions.insurance != undefined && testCase.addonPageOptions.insurance == AddOnInsurance.CDW){
                    console.log("await BookingDeliveryDetailsPage.rentalBreakdownPanel.CDWPricePeriod.getText(");
                    console.log(await BookingDeliveryDetailsPage.rentalBreakdownPanel.CDWPricePeriod.getText());
                    expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.CDWPricePeriod.getText())
                    .withContext("CDW PRICE IS NOT CORRECT")
                    .toEqual(`AED 10`);
                    //.toEqual(`AED ${AddOnInsurance.CDW.price}`);

                    expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.CDWPricePerDay.getText())
                    .withContext("CDW PRICE PER DAY IS NOT CORRECT")
                    .toEqual(`AED 10 / day`);
                }

                
                if(testCase.addonPageOptions.secondaryDriver != undefined && testCase.addonPageOptions.secondaryDriver == AddOnSecondaryDriver.WITH){
                    expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.secondaryDriverPricePeriod.getText())
                    .withContext("Secondary driver price IS NOT CORRECT")
                    .toEqual(`AED 35`);
                    //.toEqual(`AED ${AddOnInsurance.CDW.price}`);

                    expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.secondaryDriverPricePerDay.getText())
                    .withContext("Secondary driver PRICE PER DAY IS NOT CORRECT")
                    .toEqual(`AED 35 / day`);
                }

                // summary
                expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.rentalPriceSummary.getText())
                .withContext("Total price is not correct!")
                .toEqual(`AED ${BookingDeliveryDetailsPage.calculateSummary(testCase)}`);
                
                //await BookingAddonsPage.continueToPaymentButton.click();
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


                await BookingAddonsPage.continueToPaymentButton.visiblityClick();
            });
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