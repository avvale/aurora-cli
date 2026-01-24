import {
  IamPaginateTenantsController,
  IamPaginateTenantsHandler,
} from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTenantsController', () => {
  let controller: IamPaginateTenantsController;
  let handler: IamPaginateTenantsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamPaginateTenantsController],
      providers: [
        {
          provide: IamPaginateTenantsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamPaginateTenantsController>(
      IamPaginateTenantsController,
    );
    handler = module.get<IamPaginateTenantsHandler>(IamPaginateTenantsHandler);
  });

  describe('main', () => {
    test('IamPaginateTenantsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a iamMockTenantData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: iamMockTenantData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: iamMockTenantData,
      });
    });
  });
});
