import { IamCreateRoleAccountInput } from '@api/graphql';
import {
  IamCreateRolesAccountsHandler,
  IamCreateRolesAccountsResolver,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRolesAccountsResolver', () => {
  let resolver: IamCreateRolesAccountsResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCreateRolesAccountsResolver,
        {
          provide: IamCreateRolesAccountsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamCreateRolesAccountsResolver>(
      IamCreateRolesAccountsResolver,
    );
  });

  test('IamCreateRolesAccountsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamCreateRolesAccountsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an rolesAccounts created', async () => {
      expect(
        await resolver.main(
          <IamCreateRoleAccountInput[]>iamMockRoleAccountData,
        ),
      ).toBe(undefined);
    });
  });
});
