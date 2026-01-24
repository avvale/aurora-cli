/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetAccountsHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetAccountsHandler', () => {
  let handler: IamGetAccountsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamGetAccountsHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<IamGetAccountsHandler>(IamGetAccountsHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamGetAccountsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamGetAccountsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a iamMockAccountData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockAccountData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        iamMockAccountData,
      );
    });
  });
});
