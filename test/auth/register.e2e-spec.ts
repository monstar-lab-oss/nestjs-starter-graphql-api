import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../../src/app.module';
import {
  closeDBAfterTest,
  createDBEntities,
  resetDBBeforeTest,
} from './../test-utils';

describe('Mutation #register', () => {
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
    email: 'jhon.doe@example.com',
  };

  const password = 'Aa123456';
  const registerMutation = ({ name, password, email, username }: any) => `
    mutation {
      register(input: {
        name: "${name}",
        password: "${password}",
        email: "${email}",
        username: "${username}"
      }){
        name,
        email,
        username,
      }
    }
  `;

  it('should successfully register user', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerMutation({ ...userInfo, password }),
      });

    expect(status).toBe(200);
    expect(body.data).toEqual({
      register: userInfo,
    });
  });

  it('should fail to register user with existing email/username', async () => {
    const result = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerMutation({ ...userInfo, password }),
      });

    const {
      body: { errors },
    } = result;
    const { extensions } = errors[0];

    expect(extensions).toEqual(
      expect.objectContaining({
        response: {
          statusCode: 409,
          error: 'Conflict',
          message: 'User with given email/username already exists',
        },
      }),
    );
  });

  it('should fail to register with missing required data ', async () => {
    const { name } = userInfo;
    const result = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          register(input: {
            name: "${name}",
            password: "${password}",
            email: "jhon.doe2@example.com"
          }){ id }
        }`,
      });

    const {
      statusCode,
      body: { errors },
    } = result;

    expect(statusCode).toEqual(400);
    expect(errors[0]).toEqual(
      expect.objectContaining({
        extensions: {
          code: 'GRAPHQL_VALIDATION_FAILED',
        },
        message:
          'Field "RegisterInput.username" of required type "String!" was not provided.',
      }),
    );
  });

  afterAll(async () => {
    await app.close();
    await closeDBAfterTest();
  });
});
