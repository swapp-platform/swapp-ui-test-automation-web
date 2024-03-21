import { WebdriverIOElement } from "../../common/types/wdio";
import {BookingSwiperSlide, BookingSwiperSlideInstance} from "../../common/util/components/booking-swiper-slide.js";
import { EnvironmentVariables } from '../../config/environment-variables.js';

class HomePage {


    goTo = async ():(Promise<void>) => {
        await browser.url(EnvironmentVariables.joinswapp_url);
    }

    get bookingSwiperSlide(): BookingSwiperSlide{
        return  BookingSwiperSlideInstance;
    }

    get rentalsNavMenu(): WebdriverIOElement{
        return $('//a[@data-testid="navigation_rentals-link"]');
    }


}

export default new HomePage