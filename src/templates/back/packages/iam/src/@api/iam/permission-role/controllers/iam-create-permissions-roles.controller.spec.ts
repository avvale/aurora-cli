/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamCreatePermissionsRolesController,
  IamCreatePermissionsRolesHandler,
} from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionsRolesController', () => {
  let controller: IamCreatePermissionsRolesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IamCreatePermissionsRolesController],
      providers: [
        {
          provide: IamCreatePermissionsRolesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamCreatePermissionsRolesController>(
      IamCreatePermissionsRolesController,
    );
  });

  describe('main', () => {
    test('IamCreatePermissionsRolesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an iamMockPermissionRoleData created', async () => {
      expect(await controller.main(iamMockPermissionRoleData)).toBe(undefined);
    });
  });
});
