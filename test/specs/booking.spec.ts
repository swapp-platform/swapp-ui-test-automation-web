import { EnvironmentVariables } from '../../config/environment-variables.js';

import {API} from '../../common/api/api.js';
import { CarCard } from '../../common/util/components/car-card.js';
import CarDetailsPage from '../pageobjects/car-details.page.js';
import BookingDeliveryDetailsPage from "../pageobjects/booking/booking-delivery-details.page.js";
import BookingAddonsPage from "../pageobjects/booking/booking-add-ons.page.js";
import BookingPaymentPage from "../pageobjects/booking/booking-payment.page.js";
import {Case1, DeliverOption} from "../../common/types/types.js";


Case1.forEach( (testCase) => {
    var car:CarCard;

    describe('My Login application', () => {

        beforeAll(async () => {
            await browser.url(EnvironmentVariables.joinswapp_url);
            await API.LoginWithAPI();
            await browser.url(EnvironmentVariables.joinswapp_url);
        });


        it('Daily HOME - select the car', async () => {
            car = new CarCard(testCase.carId);
            await car.card.scrollIntoView()
            await car.card.click();
        });

        it('Car details - ', async () => {
            await CarDetailsPage.termsAndConditionsCheckbox.scrollIntoView({block: 'center', inline: 'center'});
            await CarDetailsPage.termsAndConditionsCheckbox.click();
            await browser.pause(3000);

            await CarDetailsPage.continueToBookingButton.click();

        });

        it("DeliveryDetailsPage - ", async () => {
            if(testCase.deliveryOption == DeliverOption.DEFAULT || 
                testCase.deliveryOption == DeliverOption.SELF_PICKUP){

                try{
                    await BookingDeliveryDetailsPage.editSelfPickupLocationButton.scrollIntoView({block: 'center', inline: 'center'});
                    await BookingDeliveryDetailsPage.editSelfPickupLocationButton.click();
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
                await BookingDeliveryDetailsPage.door2DoorMap.selectAddressSuggestion(1).click();
                await BookingDeliveryDetailsPage.door2DoorMap.confirmAddressButton.click();
                await BookingDeliveryDetailsPage.door2DoorMap.saveDeliveryAddressButton.click();
            }



            await BookingDeliveryDetailsPage.continueToAddonsButton.waitForDisplayed();
            await BookingDeliveryDetailsPage.continueToAddonsButton.scrollIntoView({block: 'center', inline: 'center'});
            await BookingDeliveryDetailsPage.continueToAddonsButton.click();


        });

        it('Addons Page - ', async () => {
            if (testCase.insurance != null){
                await BookingAddonsPage.setInsurance(testCase.insurance);
            }

            if (testCase.secondaryDriver != null){
                await BookingAddonsPage.setSecondaryDriver(testCase.secondaryDriver);
            }

            await BookingAddonsPage.continueToPaymentButton.click();
            
            await browser.pause(20000);

        });

        
    })

});