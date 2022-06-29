# nestjs7-cucumber

This project is created by @nestjs/cli@7.6.0 and supports Cucumber-js.

## Install Cucumber-js and Supertest

Please follow the official guide to install Cucumber-js.

- <https://cucumber.io/docs/installation/javascript/>

```bash
npm i -D @cucumber/cucumber @cucumber/pretty-formatter
```

You also need to install Supertest to call REST APIs. You can choose either Supertest or PactumJS which is officially recommeded by Cucumber project.

```bash
# Already installed by @nestjs/cli
npm i -D supertest
```

If you want to use typescript with cucumber, you need to upgrade following packages to the latest version.

```bash
npm i -D typescript@latest ts-node@latest ts-loader@latest
```

## Create a feature file

Create a feature file. For more details please refer to the following repository on GitHub.

- <https://github.com/cucumber/cucumber-js>

```text
Feature: Greeting
  System returns a greeting

  Scenario: Basic usage
    When I call Greeting API
    Then The HTTP status code is 200
    Then The response body is:
      """
      {
        "message": "Hello World!"
      }
      """
```

There are many cucumber extensions for VSCode.

## Create a step file

Create a step definition file. For more details please refer to the following repository on GitHub.

- <https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/step_definitions.md>

```ts
import * as request from 'supertest';
import * as assert from 'assert';
import { BeforeAll, Before, When, Then } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { AppService } from '../../../src/app.service';

// World data
// https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md
const world: {
  app?: INestApplication;
  response?: request.Response;
} = {};

BeforeAll(async () => {
  // Initialize NestJS Application for Automated Testing
  // https://docs.nestjs.com/fundamentals/testing
  const moduleRef = await Test.createTestingModule({
    // TODO: Please add modules and services here.
    imports: [AppModule],
    providers: [AppService],
  }).compile();

  world.app = moduleRef.createNestApplication();
  await world.app.init();
});

Before(() => {
  // Clear the previous resonse before each scenarios
  world.response = undefined;
});

When('I call Greeting API', async () => {
  world.response = await request(world.app.getHttpServer()).get('/').send();
});

Then('The HTTP status code is {int}', (expectedStatusCode) => {
  assert.strictEqual(world.response.statusCode, expectedStatusCode);
});

Then('The response body is:', (expectedResponseBody: string) => {
  assert.deepStrictEqual(world.response.body, JSON.parse(expectedResponseBody));
});
```

> You can use other assertion library such as `chai` and `jest` instead of Node.js standard `assert` library.

## Run Cucumber

Run the follwoing command in a Terminal. HTML and JSON format reports will be output to the `/report` directory.

```bash
npm run test:cucumber
```

## Configure Cucumber

Please refer to the following document.

- <https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md>