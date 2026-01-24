import { IamCreateRoleInput } from '@api/graphql';
import { IamCreateRolesHandler, IamCreateRolesResolver } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRolesResolver', () => {
  let resolver: IamCreateRolesResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCreateRolesResolver,
        {
          provide: IamCreateRolesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamCreateRolesResolver>(IamCreateRolesResolver);
  });

  test('IamCreateRolesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamCreateRolesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an roles created', async () => {
      expect(await resolver.main(<IamCreateRoleInput[]>iamMockRoleData)).toBe(
        undefined,
      );
    });
  });
});
