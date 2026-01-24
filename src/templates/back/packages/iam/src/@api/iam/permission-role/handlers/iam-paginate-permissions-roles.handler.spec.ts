/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamPaginatePermissionsRolesHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginatePermissionsRolesHandler', () => {
  let handler: IamPaginatePermissionsRolesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamPaginatePermissionsRolesHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<IamPaginatePermissionsRolesHandler>(
      IamPaginatePermissionsRolesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamPaginatePermissionsRolesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamPaginatePermissionsRolesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a permissionsRoles', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: iamMockPermissionRoleData.length,
              count: iamMockPermissionRoleData.length,
              rows: iamMockPermissionRoleData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: iamMockPermissionRoleData.length,
        count: iamMockPermissionRoleData.length,
        rows: iamMockPermissionRoleData,
      });
    });
  });
});
