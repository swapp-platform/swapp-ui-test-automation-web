import { EnvironmentVariables } from '../../config/environment-variables.js';

import {API} from '../../common/api/api.js';
import { CarCard } from '../../common/util/components/car-card.js';
import CarDetailsPage from '../pageobjects/car-details.page.js';
import BookingDeliveryDetailsPage from "../pageobjects/booking/booking-delivery-details.page.js";
import BookingAddonsPage from "../pageobjects/booking/booking-add-ons.page.js";
import BookingPaymentPage from "../pageobjects/booking/booking-payment.page.js";

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        //await LoginPage.open()
        await browser.url(EnvironmentVariables.joinswapp_url);
        await API.LoginWithAPI();
        await browser.url(EnvironmentVariables.joinswapp_url);
        await browser.pause(5000);
        const carCard  = new CarCard(17);
        await carCard.card.scrollIntoView()
        await carCard.card.click();

        await browser.pause(3000);
        await CarDetailsPage.termsAndConditionsCheckbox.scrollIntoView({block: 'center', inline: 'center'});
        await CarDetailsPage.termsAndConditionsCheckbox.click();
        await CarDetailsPage.continueToBookingButton.click();
        await browser.pause(3000);
        await BookingDeliveryDetailsPage.editSelfPickupLocationButton.scrollIntoView({block: 'center', inline: 'center'});
        await BookingDeliveryDetailsPage.editSelfPickupLocationButton.click();
        await browser.pause(5000);
        await BookingDeliveryDetailsPage.selfPickupLocationMap.confirmPickupLocation.click();
        await browser.pause(5000);

        await BookingDeliveryDetailsPage.continueToAddonsButton.waitForDisplayed();
        await BookingDeliveryDetailsPage.continueToAddonsButton.scrollIntoView({block: 'center', inline: 'center'});
        await BookingDeliveryDetailsPage.continueToAddonsButton.click();

        await BookingAddonsPage.insuraneCDW.click();
        await BookingAddonsPage.withSecondaryDriver.click();

        await BookingPaymentPage.bookCarButton.click();



    })

    
})

