/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteTenantsAccountsHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantsAccountsHandler', () => {
  let handler: IamDeleteTenantsAccountsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteTenantsAccountsHandler,
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

    handler = module.get<IamDeleteTenantsAccountsHandler>(
      IamDeleteTenantsAccountsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamDeleteTenantsAccountsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteTenantsAccountsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an iamMockTenantAccountData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantAccountData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        iamMockTenantAccountData,
      );
    });
  });
});
