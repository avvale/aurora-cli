/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateTenantsAccountsHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTenantsAccountsHandler', () => {
  let handler: IamPaginateTenantsAccountsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamPaginateTenantsAccountsHandler,
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

    handler = module.get<IamPaginateTenantsAccountsHandler>(
      IamPaginateTenantsAccountsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamPaginateTenantsAccountsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamPaginateTenantsAccountsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a tenantsAccounts', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: iamMockTenantAccountData.length,
              count: iamMockTenantAccountData.length,
              rows: iamMockTenantAccountData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: iamMockTenantAccountData.length,
        count: iamMockTenantAccountData.length,
        rows: iamMockTenantAccountData,
      });
    });
  });
});
