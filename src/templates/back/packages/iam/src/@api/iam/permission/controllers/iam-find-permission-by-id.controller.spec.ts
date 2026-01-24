/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import {
  IamFindPermissionByIdController,
  IamFindPermissionByIdHandler,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionByIdController', () => {
  let controller: IamFindPermissionByIdController;
  let handler: IamFindPermissionByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamFindPermissionByIdController],
      providers: [
        {
          provide: IamFindPermissionByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamFindPermissionByIdController>(
      IamFindPermissionByIdController,
    );
    handler = module.get<IamFindPermissionByIdHandler>(
      IamFindPermissionByIdHandler,
    );
  });

  describe('main', () => {
    test('IamFindPermissionByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an permission by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockPermissionData[0])),
        );
      expect(await controller.main(iamMockPermissionData[0].id)).toBe(
        iamMockPermissionData[0],
      );
    });
  });
});
