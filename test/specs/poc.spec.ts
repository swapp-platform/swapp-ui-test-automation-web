import { EnvironmentVariables } from '../../config/environment-variables.js';

import {API} from '../../common/api/api.js';
import { CarCard } from '../../common/util/components/car-card.js';
import HomePage from '../pageobjects/home.page.js';
import CarDetailsPage from '../pageobjects/car-details.page.js';
import BookingDeliveryDetailsPage from "../pageobjects/booking/booking-delivery-details.page.js";
import BookingAddonsPage from "../pageobjects/booking/booking-add-ons.page.js";
import BookingPaymentPage from "../pageobjects/booking/booking-payment.page.js";
import BookingSuccesCheckoutPage from "../pageobjects/booking/booking-success-checkout.page.js";
import BookingOverviewPage from "../pageobjects/booking/booking-overview.page.js";
import {Case1, pocCase1, DeliverOption, SelfPickupDeliveryDetails, DoorToDoorDeliveryDetails, AddOnInsurance, AddOnSecondaryDriver} from "../../common/types/types.js";
import {VisibilityObject} from "../../common/types/types.js";
import {getFormattedDateAsString} from "../../common/util/helper.js";
import {AssertInstance} from "../../common/util/assertions.js";


pocCase1
    .filter( (testCase) => testCase.isIncluded == true)
    .forEach( (testCase) => {
    var car:CarCard;
    var bookingId: string;

    describe(`TC:${testCase.testCase} Create the booking on USER side =>`, () => {

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

                        expect(await BookingDeliveryDetailsPage.selfPickupLocationTitle.getText())
                            .withContext('Self pickup location is not correct')
                            .toEqual("Burj Kalifa tower");

                    });
                }

                if(details.selfPickupDateTime != undefined){
                    //change pickup time
                }

                if(details.selfPickupReturnDateTime != undefined){
                    //change return time
                }

               

            } 
            else if(testCase.deliveryDetailsPageOptions.deliveryOption == DeliverOption.DOOR_TO_DOOR){
                const details = testCase.deliveryDetailsPageOptions.deliveryDetails as DoorToDoorDeliveryDetails;
                if(details.doorToDoorLocation!= undefined){


                    it('Change location', async () => {
                        await BookingDeliveryDetailsPage.editDoor2DoorLocationDeliveryButton.click();
                        await BookingDeliveryDetailsPage.door2DoorMap.addressInput.click();
                        await BookingDeliveryDetailsPage.door2DoorMap.addressInput.setValue(details!.doorToDoorLocation!.toString());
                        await BookingDeliveryDetailsPage.door2DoorMap.selectAddressSuggestion(1).visiblityClick();
                        await BookingDeliveryDetailsPage.door2DoorMap.confirmAddressButton.visiblityClick();
                        await BookingDeliveryDetailsPage.door2DoorMap.saveDeliveryAddressButton.visiblityClick();

                        expect(await BookingDeliveryDetailsPage.doorToDoorDeliveryLocationTitle.getText())
                            .withContext('Self pickup location is not correct')
                            .toEqual("Burj Khalifa - Sheikh Mohammed bin Rashid Boulevard");

                    });
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


            it('Assert data on DeliveryDetailsPage', async () => {
                // check book period
                const option: DeliverOption = testCase.deliveryDetailsPageOptions.deliveryOption;
                if(option == DeliverOption.SELF_PICKUP){
                    AssertInstance.DeliveryDetailsPage
                    .deliveryDateTime(await BookingDeliveryDetailsPage.rentalBreakdownPanel.deliveryDateTime.getText(), testCase);

                    AssertInstance.DeliveryDetailsPage
                    .returnDateTime(await BookingDeliveryDetailsPage.rentalBreakdownPanel.returnDateTime.getText(), testCase);
                } else if (option == DeliverOption.DOOR_TO_DOOR){
                    AssertInstance.DeliveryDetailsPage
                    .doorToDoorDeliveryDateTime(await BookingDeliveryDetailsPage.rentalBreakdownPanel.deliveryDateTime.getText(), testCase);
                    
                    AssertInstance.DeliveryDetailsPage
                    .doorToDoorReturnDateTime(await BookingDeliveryDetailsPage.rentalBreakdownPanel.returnDateTime.getText(), testCase);
                }


                // check price breakdown
                AssertInstance.DeliveryDetailsPage
                .rentalPricePeriod(await BookingDeliveryDetailsPage.rentalBreakdownPanel.rentalPricePeriod.getText(), testCase);
                AssertInstance.DeliveryDetailsPage
                .rentalPricePerDay(await BookingDeliveryDetailsPage.rentalBreakdownPanel.rentalPricePerDay.getText(), testCase);

                if(option == DeliverOption.DOOR_TO_DOOR){
                    AssertInstance.DeliveryDetailsPage
                    .doorToDoorDeliveryPrice(await BookingDeliveryDetailsPage.rentalBreakdownPanel.doorToDoorDelivery.getText(), testCase);
                }

                // summary
                AssertInstance.DeliveryDetailsPage
                .rentalPriceSummary(await BookingDeliveryDetailsPage.rentalBreakdownPanel.rentalPriceSummary.getText(), testCase);
                
                await BookingDeliveryDetailsPage.continueToAddonsButton.visiblityClick();
            });
        });


        describe('AddonsPage => ', () => {
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
                it('Set Secondary driver =>' , async () => {
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

            it('Assert data on AddonsPage =>', async () => {
                const option: DeliverOption = testCase.deliveryDetailsPageOptions.deliveryOption;

                AssertInstance.AddonsPage
                .deliveryDateTime(await BookingAddonsPage.rentalBreakdownPanel.deliveryDateTime.getText(), testCase);
                AssertInstance.AddonsPage
                .returnDateTime(await BookingAddonsPage.rentalBreakdownPanel.returnDateTime.getText(), testCase);
                AssertInstance.AddonsPage
                .rentalPricePeriod(await BookingAddonsPage.rentalBreakdownPanel.rentalPricePeriod.getText(), testCase);
                AssertInstance.AddonsPage
                .rentalPricePerDay(await BookingAddonsPage.rentalBreakdownPanel.rentalPricePerDay.getText(), testCase);


                await browser.pause(5000);
                if(testCase.addonPageOptions.insurance != undefined && testCase.addonPageOptions.insurance == AddOnInsurance.CDW){
                    AssertInstance.AddonsPage
                    .CDWPricePeriod(await BookingAddonsPage.rentalBreakdownPanel.CDWPricePeriod.getText(), testCase);
    
                    AssertInstance.AddonsPage
                    .CDWPricePerDay(await BookingAddonsPage.rentalBreakdownPanel.CDWPricePerDay.getText(), testCase);
                }

                
                if(testCase.addonPageOptions.secondaryDriver != undefined && testCase.addonPageOptions.secondaryDriver == AddOnSecondaryDriver.WITH){
                    AssertInstance.AddonsPage
                    .secondaryDriverPricePeriod(await BookingAddonsPage.rentalBreakdownPanel.secondaryDriverPricePeriod.getText(), testCase);

                    AssertInstance.AddonsPage
                    .secondaryDriverPricePerDay(await BookingAddonsPage.rentalBreakdownPanel.secondaryDriverPricePerDay.getText(), testCase);
                }

                if(option == DeliverOption.DOOR_TO_DOOR){
                    AssertInstance.AddonsPage
                    .doorToDoorDeliveryPrice(await BookingDeliveryDetailsPage.rentalBreakdownPanel.doorToDoorDelivery.getText(), testCase);
                }

                // summary
                expect(await BookingDeliveryDetailsPage.rentalBreakdownPanel.rentalPriceSummary.getText())
                .withContext("Total price is not correct!")
                .toEqual(`AED ${BookingDeliveryDetailsPage.calculateSummary(testCase)}`);


                await BookingAddonsPage.continueToPaymentButton.visiblityClick();
            });
        });

        // this needs some happyness checking as well
        it('PaymentDetailsPage => ', async () => {
            if (testCase.paymentPageOptions.cardDetails != undefined){
               // set custom payment details 
               // Note: What if user already has card details filled out? 
            }

            if (testCase.paymentPageOptions.billingDetails != undefined){
               // set custom payment details
                // Note: What if user already has billing details filled out? 

            }


            await BookingPaymentPage.bookCarButton.visiblityClick();

            await browser.pause(5000); // wait for redirect

            //expect(browser.getUrl())
            //.withContext("NOT REDIRECTED")
            //.toContain("/success-checkout/")
            //.toEqual(`${EnvironmentVariables.joinswapp_url}/en-DXB/${testCase.city}/booking/{some regex check?}}/success-checkout/`)

            await BookingSuccesCheckoutPage.checkYourBookingButton.visiblityClick();

        });

        // if testase is happyPath
        it('Check confirmation screen - ', async () => {
            bookingId = await BookingOverviewPage.bookingId.getText();

            if(testCase.deliveryDetailsPageOptions.deliveryOption == DeliverOption.DEFAULT || testCase.deliveryDetailsPageOptions.deliveryOption == DeliverOption.SELF_PICKUP){
                const details = testCase.deliveryDetailsPageOptions.deliveryDetails as SelfPickupDeliveryDetails;
                await BookingOverviewPage.selfPickupReturnDate.scrollIntoView({ block: 'center', inline: 'center' });
                AssertInstance.OverviewPage
                .selfPickupDate(await BookingOverviewPage.selfPickupDate.getText(), testCase);

                AssertInstance.OverviewPage
                .selfPickupTime(await BookingOverviewPage.selfPickupTime.getText(), testCase);

                AssertInstance.OverviewPage
                .selfPickupReturnDate(await BookingOverviewPage.selfPickupReturnDate.getText(), testCase);

                AssertInstance.OverviewPage
                .selfPickupReturnTime(await BookingOverviewPage.selfPickupReturnTime.getText(), testCase);

            } 
            else if(testCase.deliveryDetailsPageOptions.deliveryOption == DeliverOption.DOOR_TO_DOOR){
                const details = testCase.deliveryDetailsPageOptions.deliveryDetails as DoorToDoorDeliveryDetails;
               
            }

            //TODO PAYMENT ELLENŐRZÉS


        });

        it('Check banner on home screen - ', async () => {
                await HomePage.goTo();
                await browser.pause(10000);
                AssertInstance.OverviewPage
                .selfPickupDate(await HomePage.bookingSwiperSlide.handOverDate.getText(), testCase);

                AssertInstance.OverviewPage
                .selfPickupReturnDate(await HomePage.bookingSwiperSlide.handBackDate.getText(), testCase);

                AssertInstance.OverviewPage
                .selfPickupTime(await HomePage.bookingSwiperSlide.handOverTime.getText(), testCase);
        });

        it('Check user/rental - ', async () => {
            await HomePage.rentalsNavMenu.visiblityClick();

            await $('//h4[@data-testid="rental_profile_myrentals-upcoming-tab"]').click();

            expect(await $(`//span[text()="${bookingId}"]//..//..//..//..//div`))
            .toBeDisplayed();

            (await $(`//span[text()="${bookingId}"]//..//..//..//..//div`)).visiblityClick();

            browser.pause(10000);


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