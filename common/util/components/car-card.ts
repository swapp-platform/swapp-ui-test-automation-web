import { WebdriverIOElement } from "../../types/wdio";

export class CarCard{
    carId: number;
    cardXpath: String;
    constructor(carId : number){
        this.carId = carId;
        this.cardXpath = `//div[@data-testid="car-card_${carId}"]`;

    }

    get card(): WebdriverIOElement{
        return $(`${this.cardXpath}`);
    }

    get carName(): WebdriverIOElement{
        return $(`(${this.cardXpath}//h3)[1]`);
    }

    get carPrice(): WebdriverIOElement{
        return $(`${this.cardXpath}//b[@data-testid="dailyPrice"]`);
    }

    get totalRentalFee(): WebdriverIOElement{
        return $(`${this.cardXpath}//span[@data-testid="totalRentalFee"]`);
    }

    //get tag(){}

    //get chip(){}
}