import { EnvironmentVariables } from './environment-variables.js';
import { Options } from '@wdio/types';
import allureReporter from '@wdio/allure-reporter';
// import { RemoteCapability } from '@wdio/types/build/Capabilities';
// import { checkAppState, checkAppStateRunning } from '../test/common-specs/common-specs';

export const sharedConfig: WebdriverIO.Config = {
  specs: Array(1).fill(`../test/specs/${EnvironmentVariables.configSpecs}`),
  suites: {},
  specFileRetries: EnvironmentVariables.specFileRetries,
  specFileRetriesDelay: 0,
  runner: 'local',
  maxInstances: 1,
  logLevel: EnvironmentVariables.logLevel as Options.WebDriverLogTypes,
  bail: EnvironmentVariables.bail,
  waitforTimeout: EnvironmentVariables.waitForTimeout,
  waitforInterval: EnvironmentVariables.waitForInterval,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'jasmine',
  capabilities: [],
  reporters: [
    [
      'allure',
      {
        outputDir: 'result',
        addConsoleLogs: true,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
    [
      'junit',
      {
        outputDir: 'junit',
        errorOptions: {
          error: 'message',
          failure: 'message',
          stacktrace: 'stack',
        },
        outputFileFormat: function (options: any) {
          return `wdio-${options.cid}-result.xml`;
        },
      },
    ],
  ],

  jasmineOpts: {
    defaultTimeoutInterval: 1000000,
    stopOnSpecFailure: false,
  },
  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json',
    },
  },
  //before: function (caps, specs, browser) {
    //browser.addCommand(
    //  'waitAndClick',
    //  function () {
    //    this.waitForDisplayed();
    //    this.click();
    //  },
    //  true
    //);
//
    //const sessionId = driver.sessionId;
    //console.log({ sessionId });
//
    //// console.log({ device: driver.capabilities.device });
    //// // @ts-ignore
    //// console.log({ os_version: driver.capabilities.os_version });
    //driver.logEvent('driver.sessionId', sessionId);
    //allureReporter.addAttachment('driver.sessionId', sessionId, 'text/plain');
 // },
  beforeTest: async function (test, context) {
    console.log(test.fullName);
  },
  afterTest: function (test, context, result) {
    if (result.error !== undefined) {
      driver.takeScreenshot();
      allureReporter.addAttachment('driver.sessionId', driver.sessionId, 'text/plain');
      allureReporter.addAttachment('driver.pageSource', driver.getPageSource(), 'application/xml');
      try {
        // @ts-ignore
        const browserstack = driver.options.capabilities.browserstack;
        if (browserstack) {
          driver.executeScript(
            `browserstack_executor: {"action": "setSessionStatus", "arguments":
                    {"status":"failed", "reason": "${result?.error?.message}"}}`,
            []
          );
        }
      } catch (error) {
        console.error('After hook');
        console.error({ error });
      }
    }
  },
};
