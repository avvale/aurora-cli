/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamFindPermissionRoleByIdController,
  IamFindPermissionRoleByIdHandler,
} from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionRoleByIdController', () => {
  let controller: IamFindPermissionRoleByIdController;
  let handler: IamFindPermissionRoleByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamFindPermissionRoleByIdController],
      providers: [
        {
          provide: IamFindPermissionRoleByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamFindPermissionRoleByIdController>(
      IamFindPermissionRoleByIdController,
    );
    handler = module.get<IamFindPermissionRoleByIdHandler>(
      IamFindPermissionRoleByIdHandler,
    );
  });

  describe('main', () => {
    test('IamFindPermissionRoleByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an permissionRole by id', async () => {
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
