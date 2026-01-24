import { IamDeleteRolesController, IamDeleteRolesHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRolesController', () => {
  let controller: IamDeleteRolesController;
  let handler: IamDeleteRolesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamDeleteRolesController],
      providers: [
        {
          provide: IamDeleteRolesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamDeleteRolesController>(IamDeleteRolesController);
    handler = module.get<IamDeleteRolesHandler>(IamDeleteRolesHandler);
  });

  describe('main', () => {
    test('IamDeleteRolesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an iamMockRoleData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleData)),
        );
      expect(await controller.main()).toBe(iamMockRoleData);
    });
  });
});
