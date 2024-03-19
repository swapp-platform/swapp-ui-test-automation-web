import { EnvironmentVariables } from '../../config/environment-variables.js';

import {API} from '../../common/api/api.js';
import { CarCard } from '../../common/util/components/car-card.js';
import CarDetailsPage from '../pageobjects/car-details.page.js';
import BookingDeliveryDetailsPage from "../pageobjects/booking/booking-delivery-details.page.js";
import BookingAddonsPage from "../pageobjects/booking/booking-add-ons.page.js";
import BookingPaymentPage from "../pageobjects/booking/booking-payment.page.js";
import {Case1, DeliverOption} from "../../common/types/types.js";
import {VisibilityObject} from "../../common/types/types.js";


Case1.forEach( (testCase) => {
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
            if(testCase.deliveryOption == DeliverOption.DEFAULT || 
                testCase.deliveryOption == DeliverOption.SELF_PICKUP){

                try{
                    await BookingDeliveryDetailsPage.editSelfPickupLocationButton.visiblityClick();
                    await BookingDeliveryDetailsPage.selfPickupLocationMap.confirmPickupLocation.click();
                    await BookingDeliveryDetailsPage.selfPickupLocationMap.getLocation(testCase.selfPickupLocation!)
                    await BookingDeliveryDetailsPage.selfPickupLocationMap.confirmPickupLocation.click();


                    
                }catch(error) {
                    console.log("SelfPickup location is not defined!");
                }

            } else if(testCase.deliveryOption == DeliverOption.DOOR_TO_DOOR){
                await BookingDeliveryDetailsPage.editDoor2DoorLocationDeliveryButton.click();
                await BookingDeliveryDetailsPage.door2DoorMap.addressInput.click();
                await BookingDeliveryDetailsPage.door2DoorMap.addressInput.setValue(testCase.doorToDoorLocation!.toString());
                await BookingDeliveryDetailsPage.door2DoorMap.selectAddressSuggestion(1).visiblityClick();
                await BookingDeliveryDetailsPage.door2DoorMap.confirmAddressButton.visiblityClick();
                await BookingDeliveryDetailsPage.door2DoorMap.saveDeliveryAddressButton.visiblityClick();
            }



            await BookingDeliveryDetailsPage.continueToAddonsButton.visiblityClick();


        });

        it('Addons Page - ', async () => {
            if (testCase.insurance != null){
                await BookingAddonsPage.setInsurance(testCase.insurance);
            }

            if (testCase.secondaryDriver != null){
                await BookingAddonsPage.setSecondaryDriver(testCase.secondaryDriver);
            }

            await BookingAddonsPage.continueToPaymentButton.click();
            //await browser.pause(20000);

        });


        it('lol - ', async () => {

            //await API.LoginToADMIN();
            await browser.url("https://qa.joinswapp.com/rental-admin/users/?pageSize=10");
            //await browser.pause(20000);


        });

        
    })

});