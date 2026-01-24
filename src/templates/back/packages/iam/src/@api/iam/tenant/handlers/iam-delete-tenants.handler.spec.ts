/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteTenantsHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantsHandler', () => {
  let handler: IamDeleteTenantsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteTenantsHandler,
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

    handler = module.get<IamDeleteTenantsHandler>(IamDeleteTenantsHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamDeleteTenantsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteTenantsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an iamMockTenantData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        iamMockTenantData,
      );
    });
  });
});
