import { WebdriverIOElement } from "../../types/wdio";

export class Door2DoorMap{
    private static instance: Door2DoorMap;
    private constructor() { }

    get confirmPickupLocation(): WebdriverIOElement{
        return $('//button[@data-testid="cars-summary_edit-address-modal_confirm_button"]');
    }

    public static getInstance(): Door2DoorMap {
        if (!Door2DoorMap.instance) {
            Door2DoorMap.instance = new Door2DoorMap();
        }

        return Door2DoorMap.instance;
    }

    get addressInput(): WebdriverIOElement{
        return $('//input[@data-testid="cars-summary_edit-address-modal_address_input-field"]');
    }

    selectAddressSuggestion(index: number = 1): WebdriverIOElement{
        return $(`(//div[@data-testid="cars-summary_edit-address-modal_address_input-field-suggestion"])[${index}]`);
    }

    get confirmAddressButton(): WebdriverIOElement{
        return $(`//button[@data-testid="cars-summary_edit-address-modal_confirm_button"]`);
    }

    get saveDeliveryAddressButton(): WebdriverIOElement{
        //TODO data_testid
        return $("//button[text()='Save delivery address']");
    }


}

export const Door2DoorMapInstance = Door2DoorMap.getInstance();