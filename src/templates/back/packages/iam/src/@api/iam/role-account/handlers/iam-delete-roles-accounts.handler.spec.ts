/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteRolesAccountsHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRolesAccountsHandler', () => {
  let handler: IamDeleteRolesAccountsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteRolesAccountsHandler,
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

    handler = module.get<IamDeleteRolesAccountsHandler>(
      IamDeleteRolesAccountsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamDeleteRolesAccountsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteRolesAccountsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an iamMockRoleAccountData deleted', async () => {
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
