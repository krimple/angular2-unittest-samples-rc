import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angular2UnittestSamplesAppComponent } from '../app/angular2-unittest-samples.component';

beforeEachProviders(() => [Angular2UnittestSamplesAppComponent]);

describe('App: Angular2UnittestSamples', () => {
  it('should create the app',
      inject([Angular2UnittestSamplesAppComponent], (app: Angular2UnittestSamplesAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angular2-unittest-samples works!\'',
      inject([Angular2UnittestSamplesAppComponent], (app: Angular2UnittestSamplesAppComponent) => {
    expect(app.title).toEqual('angular2-unittest-samples works!');
  }));
});
