/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamUpdatePermissionRoleByIdController,
  IamUpdatePermissionRoleByIdHandler,
} from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionRoleByIdController', () => {
  let controller: IamUpdatePermissionRoleByIdController;
  let handler: IamUpdatePermissionRoleByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamUpdatePermissionRoleByIdController],
      providers: [
        {
          provide: IamUpdatePermissionRoleByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamUpdatePermissionRoleByIdController>(
      IamUpdatePermissionRoleByIdController,
    );
    handler = module.get<IamUpdatePermissionRoleByIdHandler>(
      IamUpdatePermissionRoleByIdHandler,
    );
  });

  describe('main', () => {
    test('IamUpdatePermissionRoleByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a permissionRole updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockPermissionRoleData[0])),
        );
      expect(await controller.main(iamMockPermissionRoleData[0])).toBe(
        iamMockPermissionRoleData[0],
      );
    });
  });
});
