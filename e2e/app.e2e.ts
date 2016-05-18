import { Angular2UnittestSamplesPage } from './app.po';

describe('angular2-unittest-samples App', function() {
  let page: Angular2UnittestSamplesPage;

  beforeEach(() => {
    page = new Angular2UnittestSamplesPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angular2-unittest-samples works!');
  });
});
