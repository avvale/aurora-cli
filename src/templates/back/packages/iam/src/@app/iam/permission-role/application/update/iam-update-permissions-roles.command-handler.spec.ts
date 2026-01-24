/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  iamMockPermissionRoleData,
  IamUpdatePermissionsRolesCommand,
} from '@app/iam/permission-role';
import { IamUpdatePermissionsRolesCommandHandler } from '@app/iam/permission-role/application/update/iam-update-permissions-roles.command-handler';
import { IamUpdatePermissionsRolesService } from '@app/iam/permission-role/application/update/iam-update-permissions-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionsRolesCommandHandler', () => {
  let commandHandler: IamUpdatePermissionsRolesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamUpdatePermissionsRolesCommandHandler,
        {
          provide: IamUpdatePermissionsRolesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamUpdatePermissionsRolesCommandHandler>(
      IamUpdatePermissionsRolesCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdatePermissionsRolesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an permissionsRoles updated', async () => {
      expect(
        await commandHandler.execute(
          new IamUpdatePermissionsRolesCommand(
            {
              permissionId: iamMockPermissionRoleData[0].permissionId,
              roleId: iamMockPermissionRoleData[0].roleId,
            },
            {},
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
