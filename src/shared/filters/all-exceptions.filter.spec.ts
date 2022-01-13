import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';

import { REQUEST_ID_TOKEN_HEADER } from '../constants';
import { BaseApiError } from '../errors/base-api-error';
import { AppLogger } from '../logger/logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

const mockMessage1 = 'mock exception string';
const mockMessage2 = { hello: 'world', hi: 'joe' };
const mockMessage3 = 'Something is very wrong';
const mockLocalizedMessage = { ja: 'ja' };

const mockException1 = new HttpException(mockMessage1, HttpStatus.NOT_FOUND);
const mockException2 = new HttpException(mockMessage2, HttpStatus.BAD_REQUEST);
const mockException3 = new BaseApiError(
  mockMessage3,
  HttpStatus.INTERNAL_SERVER_ERROR,
  undefined,
  mockLocalizedMessage,
);
const mockError = new Error(mockMessage3);

describe('AllExceptionsFilter', () => {
  let mockContext: any;
  let mockRequest: any;
  let mockResponse: any;

  const mockConfigService = {
    get: (key) => 'development',
  };
  const mockedLogger = {
    warn: jest.fn().mockReturnThis(),
    setContext: jest.fn().mockReturnThis(),
  };
  let filter: AllExceptionsFilter<any>;

  beforeEach(async () => {
    /** mock response object */
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    /** mock request object */
    mockRequest = {
      req: {
        url: 'mock-url',
        headers: [],
        header: jest.fn(),
        res: mockResponse,
      },
    };
    mockRequest.req.headers[REQUEST_ID_TOKEN_HEADER] = uuidv4();

    /** mock execution context */
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockImplementation(() => ({
      json: mockJson,
    }));
    const mockGetResponse = jest.fn().mockImplementation(() => ({
      status: mockStatus,
    }));
    const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
      getResponse: mockGetResponse,
      getRequest: jest.fn(),
    }));

    mockContext = {
      switchToHttp: mockHttpArgumentsHost,
      getArgByIndex: jest.fn(),
      getArgs: () => {
        return [{}, {}, mockRequest];
      },
      getType: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getContext: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AllExceptionsFilter,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    filter = moduleRef.get<AllExceptionsFilter<any>>(AllExceptionsFilter);
  });

  it('should be defined', async () => {
    expect(filter).toBeDefined();
  });

  it('should handle both HttpException and unhandled Error', async () => {
    filter.catch(mockException1, mockContext);
    expect(mockResponse.status).toBeCalled();
    expect(mockResponse.json).toBeCalled();

    filter.catch(mockError, mockContext);
    expect(mockResponse.status).toBeCalled();
    expect(mockResponse.json).toBeCalled();
  });

  it('should handle HttpException with right status code', async () => {
    filter.catch(mockException1, mockContext);
    expect(mockResponse.status).toBeCalledWith(HttpStatus.NOT_FOUND);

    filter.catch(mockException2, mockContext);
    expect(mockResponse.status).toBeCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('should handle unhandled error with status code 500', async () => {
    filter.catch(mockError, mockContext);
    expect(mockResponse.status).toBeCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  });

  it('should handle exception with plain string message', async () => {
    filter.catch(mockException1, mockContext);
    expect(mockResponse.json).toBeCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          statusCode: HttpStatus.NOT_FOUND,
          message: mockMessage1,
        }),
      }),
    );
  });

  it('should handle exception with object type message', async () => {
    filter.catch(mockException2, mockContext);
    expect(mockResponse.json).toBeCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          statusCode: HttpStatus.BAD_REQUEST,
          details: mockMessage2,
        }),
      }),
    );
  });

  it('should respond with Error message in development mode', async () => {
    // const configSpy = jest
    //   .spyOn(config, 'get')
    //   .mockImplementation(() => 'development');

    filter.catch(mockError, mockContext);
    expect(mockResponse.json).toBeCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: mockMessage3,
        }),
      }),
    );

    // configSpy.mockClear();
  });

  it('should suppress Error message in production mode', async () => {
    const configSpy = jest
      .spyOn(mockConfigService, 'get')
      .mockImplementation(() => 'production');

    filter.catch(mockError, mockContext);
    expect(mockResponse.json).toBeCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        }),
      }),
    );

    configSpy.mockClear();
  });

  it('should contain request id in response', async () => {
    filter.catch(mockMessage1, mockContext);
    expect(mockResponse.json).toBeCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          requestId: mockRequest.req.headers[REQUEST_ID_TOKEN_HEADER],
        }),
      }),
    );
  });

  it('should contain timestamp in response', async () => {
    const mockDate = new Date();

    const dateSpy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDate as unknown as string);

    filter.catch(mockException1, mockContext);
    expect(mockResponse.status).toBeCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toBeCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          timestamp: mockDate.toISOString(),
        }),
      }),
    );
    dateSpy.mockClear();
  });

  it('should handle BaseAPIError with right status code', async () => {
    filter.catch(mockException3, mockContext);
    expect(mockResponse.status).toBeCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  });
});
