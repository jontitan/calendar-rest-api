import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Calendar App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display current month year', () => {
    page.navigateTo();
    let date = new Date()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    expect(page.getTitleText()).toEqual(`${monthNames[date.getMonth()]} ${date.getFullYear()}`);
  });

  it('should display event summary', () => {
    expect(page.getFirstDay()).toContain("10:00 AM Dentist");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
