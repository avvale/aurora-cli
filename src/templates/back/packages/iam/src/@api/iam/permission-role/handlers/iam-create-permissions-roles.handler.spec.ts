/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamCreatePermissionsRolesHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionsRolesHandler', () => {
  let handler: IamCreatePermissionsRolesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCreatePermissionsRolesHandler,
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<IamCreatePermissionsRolesHandler>(
      IamCreatePermissionsRolesHandler,
    );
  });

  describe('main', () => {
    test('IamCreatePermissionsRolesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an iamMockPermissionRoleData created', async () => {
      expect(await handler.main(iamMockPermissionRoleData)).toBe(true);
    });
  });
});
