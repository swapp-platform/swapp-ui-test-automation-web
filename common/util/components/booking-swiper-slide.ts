import { WebdriverIOElement } from "../../types/wdio";

export class BookingSwiperSlide{
    private static instance: BookingSwiperSlide;
    private constructor() { }
    public static getInstance(): BookingSwiperSlide {
        if (!BookingSwiperSlide.instance) {
            BookingSwiperSlide.instance = new BookingSwiperSlide();
        }

        return BookingSwiperSlide.instance;
    }

    get handOverDate(): WebdriverIOElement{
        return $('//span[@data-testid="booking-widget_handover-time"]');
    }

    get handBackDate(): WebdriverIOElement{
        return $('//span[@data-testid="booking-widget_handback-time"]');
    }

    get handOverTime(): WebdriverIOElement{
        return $('//div[@data-testid="booking-widget_handback-time"]'); // this should be handover/pickup time??
    }

    get carName(): WebdriverIOElement{
        return $('//span[@data-testid="booking-widget_car-name"]');
    }

    //get extendButton():WebdriverIOElement{
        //TODO
    //}



}

export const BookingSwiperSlideInstance = BookingSwiperSlide.getInstance();