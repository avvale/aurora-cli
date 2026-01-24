/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetRolesAccountsHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetRolesAccountsHandler', () => {
  let handler: IamGetRolesAccountsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamGetRolesAccountsHandler,
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

    handler = module.get<IamGetRolesAccountsHandler>(
      IamGetRolesAccountsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamGetRolesAccountsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamGetRolesAccountsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a iamMockRoleAccountData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleAccountData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        iamMockRoleAccountData,
      );
    });
  });
});
