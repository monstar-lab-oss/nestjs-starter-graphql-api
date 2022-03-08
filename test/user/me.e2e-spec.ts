import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import {
  closeDBAfterTest,
  createDBEntities,
  resetDBBeforeTest,
} from '../test-utils';

describe('Mutation #me', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await resetDBBeforeTest();
    await createDBEntities();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const userInfo = {
    name: 'Jhon Doe',
    username: 'jhon.doe',
    password: 'Aa123456',
    email: 'jhon.doe@example.com',
  };

  it('should successfully fetch logged in user profile', async () => {
    const result = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          register(input: {
            name: "${userInfo.name}",
            email: "${userInfo.email}",
            username: "${userInfo.username}",
            password: "${userInfo.password}"
          }){ id }

          login(credential: {
            username: "${userInfo.username}",
            password: "${userInfo.password}"
          }){
            accessToken,
            refreshToken
          }
        }`,
      });

    const token = result.body.data.login;

    const {
      body: { data },
    } = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token.accessToken}`)
      .send({
        query: `{
          me {
            id,
            name,
            username,
            isAccountDisabled
          }
        }`,
      });

    expect(data.me).toEqual({
      id: 1,
      name: userInfo.name,
      isAccountDisabled: false,
      username: userInfo.username,
    });
  });

  afterAll(async () => {
    await app.close();
    await closeDBAfterTest();
  });
});
