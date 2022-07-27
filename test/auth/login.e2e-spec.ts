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

  // Create user to test login

  it('should successfully login user with right credential', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          register(input: {
            name: "Jhon Doe",
            email: "jhon.doe@example.com",
            password: "${password}",
            username: "${username}"
          }){ id }
        }`,
      });

    const {
      body: { data },
    } = await request(app.getHttpServer()) // Create user to test login
      .post('/graphql')
      .send({
        query: `mutation {
          login(credential: {
            username: "${username}",
            password: "${password}"
          }){
            accessToken,
            refreshToken
          }
        }`,
      });
    const token = data.login;

    expect(token).toHaveProperty('accessToken');
    expect(token).toHaveProperty('refreshToken');
  });

  it('should failed to login with wrong credential', async () => {
    const {
      body: { errors },
    } = await request(app.getHttpServer()) // Create user to test login
      .post('/graphql')
      .send({
        query: `mutation {
          login(credential: {
            username: "${username}",
            password: "wrong-pass"
          }){
            accessToken,
            refreshToken
          }
        }`,
      });

    const error = errors[0].extensions;
    expect(error).toEqual({
      code: 'UNAUTHENTICATED',
      response: { statusCode: 401, message: 'Unauthorized' },
    });
    expect(true).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
    await closeDBAfterTest();
  });
});
