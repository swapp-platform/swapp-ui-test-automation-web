import { ChainablePromiseArray, ChainablePromiseElement } from 'webdriverio';
import {VisibilityObject} from '../../common/types.js';
export type WebdriverIOElement = ChainablePromiseElement<WebdriverIO.Element<'async'>>;
export type WebdriverIOElementArray = ChainablePromiseArray<ElementArray>;



declare global {
    namespace WebdriverIO {
        // https://webdriver.io/docs/customcommands#adding-custom-commands
        
        // function definition : config/wdio-desktop-config.ts - before
        interface Element {
            visiblityClick: (param : VisibilityObject = {waitForDisplayedTimeout : 1000, pauseTime : 2000}) => Promise<void>;
        }

    }
}

