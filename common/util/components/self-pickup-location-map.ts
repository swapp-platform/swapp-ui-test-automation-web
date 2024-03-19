import { WebdriverIOElement } from "../../types/wdio";

export class SelfPickupLocationMap{
    private static instance: SelfPickupLocationMap;
    private constructor() { }

    get openSelfPickupLocation(): WebdriverIOElement{
        return $('img[src="/rental/svg/pinOpen.svg"]');
    }

    get confirmPickupLocation(): WebdriverIOElement{
        return $('//button[@data-testid="cars-summary_edit-address-modal_confirm_button"]');
    }

    public static getInstance(): SelfPickupLocationMap {
        if (!SelfPickupLocationMap.instance) {
            SelfPickupLocationMap.instance = new SelfPickupLocationMap();
        }

        return SelfPickupLocationMap.instance;
    }

    getLocation(pinLocation: String): WebdriverIOElement{
        //TODO this needs to be changed, this is a placeholder return
        return this.openSelfPickupLocation;

    }
}

export const SelfPickupLocationMapInstance = SelfPickupLocationMap.getInstance();