/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateTenantHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantHandler', () => {
  let handler: IamCreateTenantHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCreateTenantHandler,
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

    handler = module.get<IamCreateTenantHandler>(IamCreateTenantHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('IamCreateTenantHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an tenant created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantData[0])),
        );
      expect(await handler.main(iamMockTenantData[0], 'Europe/Madrid')).toBe(
        iamMockTenantData[0],
      );
    });
  });
});
