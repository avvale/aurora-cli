/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import {
  IamPaginatePermissionsController,
  IamPaginatePermissionsHandler,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginatePermissionsController', () => {
  let controller: IamPaginatePermissionsController;
  let handler: IamPaginatePermissionsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamPaginatePermissionsController],
      providers: [
        {
          provide: IamPaginatePermissionsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamPaginatePermissionsController>(
      IamPaginatePermissionsController,
    );
    handler = module.get<IamPaginatePermissionsHandler>(
      IamPaginatePermissionsHandler,
    );
  });

  describe('main', () => {
    test('IamPaginatePermissionsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a iamMockPermissionData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: iamMockPermissionData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: iamMockPermissionData,
      });
    });
  });
});
