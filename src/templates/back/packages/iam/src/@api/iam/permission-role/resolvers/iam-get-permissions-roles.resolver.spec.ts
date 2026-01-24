/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamGetPermissionsRolesHandler,
  IamGetPermissionsRolesResolver,
} from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetPermissionsRolesResolver', () => {
  let resolver: IamGetPermissionsRolesResolver;
  let handler: IamGetPermissionsRolesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamGetPermissionsRolesResolver,
        {
          provide: IamGetPermissionsRolesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamGetPermissionsRolesResolver>(
      IamGetPermissionsRolesResolver,
    );
    handler = module.get<IamGetPermissionsRolesHandler>(
      IamGetPermissionsRolesHandler,
    );
  });

  test('IamGetPermissionsRolesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamGetPermissionsRolesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a iamMockPermissionRoleData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockPermissionRoleData)),
        );
      expect(await resolver.main()).toBe(iamMockPermissionRoleData);
    });
  });
});
