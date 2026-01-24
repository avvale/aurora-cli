/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateAccountsInput } from '@api/graphql';
import { IamUpdateAccountsHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAccountsHandler', () => {
  let handler: IamUpdateAccountsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateAccountsHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<IamUpdateAccountsHandler>(IamUpdateAccountsHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamUpdateAccountsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateAccountsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a accounts updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockAccountData[0])),
        );
      expect(
        await handler.main(
          <IamUpdateAccountsInput>iamMockAccountData[0],
          {},
          {},
          'Europe/Madrid',
        ),
      ).toBe(iamMockAccountData[0]);
    });
  });
});
