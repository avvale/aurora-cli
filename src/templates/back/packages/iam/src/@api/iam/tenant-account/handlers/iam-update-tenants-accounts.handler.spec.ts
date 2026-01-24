/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTenantsAccountsInput } from '@api/graphql';
import { IamUpdateTenantsAccountsHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantsAccountsHandler', () => {
  let handler: IamUpdateTenantsAccountsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateTenantsAccountsHandler,
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

    handler = module.get<IamUpdateTenantsAccountsHandler>(
      IamUpdateTenantsAccountsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamUpdateTenantsAccountsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateTenantsAccountsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a tenantsAccounts updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantAccountData[0])),
        );
      expect(
        await handler.main(
          <IamUpdateTenantsAccountsInput>iamMockTenantAccountData[0],
          {},
          {},
          'Europe/Madrid',
        ),
      ).toBe(iamMockTenantAccountData[0]);
    });
  });
});
