/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateTenantAccountHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantAccountHandler', () => {
  let handler: IamCreateTenantAccountHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCreateTenantAccountHandler,
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

    handler = module.get<IamCreateTenantAccountHandler>(
      IamCreateTenantAccountHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('IamCreateTenantAccountHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an tenantAccount created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantAccountData[0])),
        );
      expect(
        await handler.main(iamMockTenantAccountData[0], 'Europe/Madrid'),
      ).toBe(iamMockTenantAccountData[0]);
    });
  });
});
