# angular2-unittest-samples-rc
The Unit Test samples from http://chariotsolutions.com/blog/post/testing-angular-2-components-unit-tests-testcomponentbuilder/ and http://chariotsolutions.com/blog/post/testing-http-services-angular-2-jasmine/ - upgraded
to use Angular 2 RC instead of the earlier alpha and beta releases.  Uses the Angular CLI.

## Prerequisites

Setup:

```bash
npm install -g angular-cli karma-cli
# this next one do if you want to administer typings until a fix
# to https://github.com/angular/angular-cli/issues/816 is in
npm install -g typings@0.8.1

# now download repo and set up
git clone https://github.com/krimple/angular2-unittest-samples-rc.git
cd angular2-unittest-samples-rc
npm install
```

## To run tests

```bash
ng test
```

I am using PhantomJS for my testing - if you have trouble with that, edit `config/karma.conf.js` and change the runner to Chrome.

