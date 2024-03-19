import allureReporter from '@wdio/allure-reporter';
//import chromeModheader from 'chrome-modheader';

import { EnvironmentVariables } from './environment-variables.js';
import { sharedConfig } from './shared-config.js';
import {  VisibilityObject } from '../common/types/types.js';

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  specs: Array(1).fill(`../test/specs/${EnvironmentVariables.configSpecs}`),
  suites: {
    customerCarePortal: ['test/specs/customer-care-portal/**/**.spec.ts'],
    lifecycle: ['test/specs/lifecycle/**/**.spec.ts'],
    purchase: ['test/specs/purchase-flow/**/**.spec.ts'],
    signupFunnel: ['test/specs/signup-funnel/**/**.spec.ts'],
    routerFlow: ['test/specs/router-flow/**/**.spec.ts'],
    signupSignin: ['test/specs/signup-signin/**/**.spec.ts'],
    telcoSignup: ['test/specs/telco-signup/**/**.spec.ts'],
    component: [
      'test/specs/customer-care-portal/**/**.spec.ts',
      'test/specs/lifecycle/**/**.spec.ts',
      'test/specs/purchase-flow/**/**.spec.ts',
      'test/specs/router-flow/**/**.spec.ts',
      'test/specs/signup-funnel/**/**.spec.ts',
      'test/specs/signup-signin/**/**.spec.ts',
      'test/specs/telco-signup/**/**.spec.ts',
      'test/specs/account-settings/delete-account/**.spec.ts',
    ],
    settings: ['test/specs/account-settings/**/**.spec.ts'],
  },
  capabilities: [
    {
      maxInstances: 3,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: [
          //'--headless=chrome' ,
          '--disable-gpu',
          '--strictSSL',
          '--window-size=1920,1200',
          '--ignore-certificate-errors',
          '--ignore-ssl-errors',
        ],
        //'--headless=chrome'
        //extensions: [chromeModheader.getEncodedExtension()],
      },
    },
  ],
  services: ['chromedriver'],
  before: function (caps, specs, browser) {
    browser.addCommand("visiblityClick", async function (param : VisibilityObject = {waitForDisplayedTimeout : 1000, pauseTime : 2000}) {
        console.log(param.pauseTime);
        console.log(param.waitForDisplayedTimeout);
        await this.scrollIntoView();
        
        await this.waitForDisplayed({timeout: param.waitForDisplayedTimeout});
        await browser.pause(param.pauseTime);
        await this.click();
      },
      true);
  },
  beforeHook: function () {
    //allureReporter.addEnvironment('specs', EnvironmentVariables.configSpecs);
  },
  beforeTest: async function (test) {
    console.log(test.fullName);
    // await browser.maximizeWindow();
    await browser.setWindowSize(1920, 1200);
  },
  afterTest: async function (test, context, { error }) {
    if (error !== undefined) {
      await browser.takeScreenshot();
      console.log('!! Test failed at this url: ' + (await browser.getUrl()));
    }
  },
};
