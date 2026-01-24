/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamDeletePermissionRoleByIdController,
  IamDeletePermissionRoleByIdHandler,
} from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionRoleByIdController', () => {
  let controller: IamDeletePermissionRoleByIdController;
  let handler: IamDeletePermissionRoleByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamDeletePermissionRoleByIdController],
      providers: [
        {
          provide: IamDeletePermissionRoleByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamDeletePermissionRoleByIdController>(
      IamDeletePermissionRoleByIdController,
    );
    handler = module.get<IamDeletePermissionRoleByIdHandler>(
      IamDeletePermissionRoleByIdHandler,
    );
  });

  describe('main', () => {
    test('IamDeletePermissionRoleByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an permissionRole deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockPermissionRoleData[0])),
        );
      expect(await controller.main(iamMockPermissionRoleData[0].id)).toBe(
        iamMockPermissionRoleData[0],
      );
    });
  });
});
