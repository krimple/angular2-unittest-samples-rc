export class Angular2UnittestSamplesPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular2-unittest-samples-app h1')).getText();
  }
}
