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
