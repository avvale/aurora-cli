/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import {
  IamDeletePermissionByIdController,
  IamDeletePermissionByIdHandler,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionByIdController', () => {
  let controller: IamDeletePermissionByIdController;
  let handler: IamDeletePermissionByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamDeletePermissionByIdController],
      providers: [
        {
          provide: IamDeletePermissionByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamDeletePermissionByIdController>(
      IamDeletePermissionByIdController,
    );
    handler = module.get<IamDeletePermissionByIdHandler>(
      IamDeletePermissionByIdHandler,
    );
  });

  describe('main', () => {
    test('IamDeletePermissionByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an permission deleted', async () => {
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
