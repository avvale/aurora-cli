/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamPaginateRolesAccountsHandler,
  IamPaginateRolesAccountsResolver,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateRolesAccountsResolver', () => {
  let resolver: IamPaginateRolesAccountsResolver;
  let handler: IamPaginateRolesAccountsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamPaginateRolesAccountsResolver,
        {
          provide: IamPaginateRolesAccountsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamPaginateRolesAccountsResolver>(
      IamPaginateRolesAccountsResolver,
    );
    handler = module.get<IamPaginateRolesAccountsHandler>(
      IamPaginateRolesAccountsHandler,
    );
  });

  test('IamPaginateRolesAccountsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamPaginateRolesAccountsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a iamMockRoleAccountData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: iamMockRoleAccountData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: iamMockRoleAccountData,
      });
    });
  });
});
