/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindTenantAccountByIdHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantAccountByIdHandler', () => {
  let handler: IamFindTenantAccountByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamFindTenantAccountByIdHandler,
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

    handler = module.get<IamFindTenantAccountByIdHandler>(
      IamFindTenantAccountByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamFindTenantAccountByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamFindTenantAccountByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an tenantAccount by id', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantAccountData[0])),
        );
      expect(
        await handler.main(iamMockTenantAccountData[0].id, {}, 'Europe/Madrid'),
      ).toBe(iamMockTenantAccountData[0]);
    });
  });
});
