/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindTenantAccountHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantAccountHandler', () => {
  let handler: IamFindTenantAccountHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamFindTenantAccountHandler,
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

    handler = module.get<IamFindTenantAccountHandler>(
      IamFindTenantAccountHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamFindTenantAccountHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamFindTenantAccountHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a tenantAccount', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantAccountData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        iamMockTenantAccountData[0],
      );
    });
  });
});
