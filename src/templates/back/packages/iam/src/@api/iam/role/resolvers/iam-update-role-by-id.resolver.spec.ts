/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateRoleByIdInput } from '@api/graphql';
import {
  IamUpdateRoleByIdHandler,
  IamUpdateRoleByIdResolver,
} from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRoleByIdResolver', () => {
  let resolver: IamUpdateRoleByIdResolver;
  let handler: IamUpdateRoleByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateRoleByIdResolver,
        {
          provide: IamUpdateRoleByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamUpdateRoleByIdResolver>(IamUpdateRoleByIdResolver);
    handler = module.get<IamUpdateRoleByIdHandler>(IamUpdateRoleByIdHandler);
  });

  test('IamUpdateRoleByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateRoleByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a role by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleData[0])),
        );
      expect(
        await resolver.main(<IamUpdateRoleByIdInput>iamMockRoleData[0]),
      ).toBe(iamMockRoleData[0]);
    });
  });
});
