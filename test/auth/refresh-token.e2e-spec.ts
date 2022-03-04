import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import exp from 'constants';
import { resourceUsage } from 'process';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import {
  closeDBAfterTest,
  createDBEntities,
  resetDBBeforeTest,
} from '../test-utils';

describe('Mutation #login', () => {
  let app: INestApplication;

  const username = 'jhon.doe';
  const password = 'Aa123456';

  beforeAll(async () => {
    await resetDBBeforeTest();
    await createDBEntities();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should successfully regenerate token from valid refresh token', async () => {
    const result = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          register(input: {
            name: "Jhon Doe",
            email: "jhon.doe@example.com",
            password: "${password}",
            username: "${username}"
          }){ id }

          login(credential: {
            username: "${username}",
            password: "${password}"
          }){
            accessToken,
            refreshToken
          }
        }`,
      });

    const token = result.body.data.login;

    const {
      body: { data },
    } = await request(app.getHttpServer()) // Create user to test login
      .post('/graphql')
      .send({
        query: `mutation {
          refreshToken(refreshToken: "${token.refreshToken}"){
            accessToken,
            refreshToken
          }
        }`,
      });

    const outputToken = data.refreshToken;

    expect(outputToken).toHaveProperty('accessToken');
    expect(outputToken).toHaveProperty('refreshToken');
  });

  afterAll(async () => {
    await app.close();
    await closeDBAfterTest();
  });
});
