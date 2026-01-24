/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamPaginatePermissionsRolesHandler,
  IamPaginatePermissionsRolesResolver,
} from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginatePermissionsRolesResolver', () => {
  let resolver: IamPaginatePermissionsRolesResolver;
  let handler: IamPaginatePermissionsRolesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamPaginatePermissionsRolesResolver,
        {
          provide: IamPaginatePermissionsRolesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamPaginatePermissionsRolesResolver>(
      IamPaginatePermissionsRolesResolver,
    );
    handler = module.get<IamPaginatePermissionsRolesHandler>(
      IamPaginatePermissionsRolesHandler,
    );
  });

  test('IamPaginatePermissionsRolesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamPaginatePermissionsRolesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a iamMockPermissionRoleData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: iamMockPermissionRoleData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: iamMockPermissionRoleData,
      });
    });
  });
});
