/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateRoleAccountByIdInput } from '@api/graphql';
import {
  IamUpdateRoleAccountByIdHandler,
  IamUpdateRoleAccountByIdResolver,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRoleAccountByIdResolver', () => {
  let resolver: IamUpdateRoleAccountByIdResolver;
  let handler: IamUpdateRoleAccountByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateRoleAccountByIdResolver,
        {
          provide: IamUpdateRoleAccountByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamUpdateRoleAccountByIdResolver>(
      IamUpdateRoleAccountByIdResolver,
    );
    handler = module.get<IamUpdateRoleAccountByIdHandler>(
      IamUpdateRoleAccountByIdHandler,
    );
  });

  test('IamUpdateRoleAccountByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateRoleAccountByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a roleAccount by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleAccountData[0])),
        );
      expect(
        await resolver.main(
          <IamUpdateRoleAccountByIdInput>iamMockRoleAccountData[0],
        ),
      ).toBe(iamMockRoleAccountData[0]);
    });
  });
});
