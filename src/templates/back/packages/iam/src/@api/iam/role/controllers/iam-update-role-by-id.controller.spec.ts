import {
  IamUpdateRoleByIdController,
  IamUpdateRoleByIdHandler,
} from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRoleByIdController', () => {
  let controller: IamUpdateRoleByIdController;
  let handler: IamUpdateRoleByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamUpdateRoleByIdController],
      providers: [
        {
          provide: IamUpdateRoleByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamUpdateRoleByIdController>(
      IamUpdateRoleByIdController,
    );
    handler = module.get<IamUpdateRoleByIdHandler>(IamUpdateRoleByIdHandler);
  });

  describe('main', () => {
    test('IamUpdateRoleByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a role updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleData[0])),
        );
      expect(await controller.main(iamMockRoleData[0])).toBe(
        iamMockRoleData[0],
      );
    });
  });
});
