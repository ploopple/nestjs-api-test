import * as request from 'supertest';
import * as rp from 'request-promise';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app.module';

const API =
  'https://3334-ploopple-nestjsapitest-0whk9u5keso.ws-eu54.gitpod.io/graphql';
describe('appController', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it(`/GET cats`, () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello');
  });

  it("should be able to see author's profile without sensitive info being displayed", async () => {
    const query = `
    query {
        getAllUsers{
          name
        }
      }
        `;

    const { data } = await rp({
      method: 'POST',
      uri: API,
      body: { query },
      json: true,
    });
    expect(data).toMatchSnapshot();
  });
});
