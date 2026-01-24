/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamDeleteRolesAccountsHandler,
  IamDeleteRolesAccountsResolver,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRolesAccountsResolver', () => {
  let resolver: IamDeleteRolesAccountsResolver;
  let handler: IamDeleteRolesAccountsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteRolesAccountsResolver,
        {
          provide: IamDeleteRolesAccountsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamDeleteRolesAccountsResolver>(
      IamDeleteRolesAccountsResolver,
    );
    handler = module.get<IamDeleteRolesAccountsHandler>(
      IamDeleteRolesAccountsHandler,
    );
  });

  test('IamDeleteRolesAccountsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteRolesAccountsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an iamMockRoleAccountData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleAccountData)),
        );
      expect(await resolver.main()).toBe(iamMockRoleAccountData);
    });
  });
});
