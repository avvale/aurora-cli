import {
  IamFindRoleByIdController,
  IamFindRoleByIdHandler,
} from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleByIdController', () => {
  let controller: IamFindRoleByIdController;
  let handler: IamFindRoleByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamFindRoleByIdController],
      providers: [
        {
          provide: IamFindRoleByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamFindRoleByIdController>(
      IamFindRoleByIdController,
    );
    handler = module.get<IamFindRoleByIdHandler>(IamFindRoleByIdHandler);
  });

  describe('main', () => {
    test('IamFindRoleByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an role by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleData[0])),
        );
      expect(await controller.main(iamMockRoleData[0].id)).toBe(
        iamMockRoleData[0],
      );
    });
  });
});
