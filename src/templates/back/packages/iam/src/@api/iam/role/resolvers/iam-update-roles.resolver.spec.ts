/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateRolesInput } from '@api/graphql';
import { IamUpdateRolesHandler, IamUpdateRolesResolver } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRolesResolver', () => {
  let resolver: IamUpdateRolesResolver;
  let handler: IamUpdateRolesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateRolesResolver,
        {
          provide: IamUpdateRolesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamUpdateRolesResolver>(IamUpdateRolesResolver);
    handler = module.get<IamUpdateRolesHandler>(IamUpdateRolesHandler);
  });

  test('IamUpdateRolesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateRolesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a roles updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleData[0])),
        );
      expect(await resolver.main(<IamUpdateRolesInput>iamMockRoleData[0])).toBe(
        iamMockRoleData[0],
      );
    });
  });
});
