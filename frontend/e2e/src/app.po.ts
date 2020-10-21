import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('h2')).getText() as Promise<string>;
  }

  getFirstDay(): Promise<string> {
    return element(by.cssContainingText('span.cal-day-number', "1"))
    .element(by.xpath("../.."))
    .getText() as Promise<string>;
  }
}
