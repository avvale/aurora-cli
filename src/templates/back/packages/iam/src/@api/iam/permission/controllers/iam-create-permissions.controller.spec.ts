/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import {
  IamCreatePermissionsController,
  IamCreatePermissionsHandler,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionsController', () => {
  let controller: IamCreatePermissionsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IamCreatePermissionsController],
      providers: [
        {
          provide: IamCreatePermissionsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamCreatePermissionsController>(
      IamCreatePermissionsController,
    );
  });

  describe('main', () => {
    test('IamCreatePermissionsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an iamMockPermissionData created', async () => {
      expect(await controller.main(iamMockPermissionData)).toBe(undefined);
    });
  });
});
