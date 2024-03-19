import { ChainablePromiseArray, ChainablePromiseElement } from 'webdriverio';

export type WebdriverIOElement = ChainablePromiseElement<WebdriverIO.Element<'async'>>;
export type WebdriverIOElementArray = ChainablePromiseArray<ElementArray>;

