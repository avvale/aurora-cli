import {
  IamUpdateTenantAccountByIdController,
  IamUpdateTenantAccountByIdHandler,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantAccountByIdController', () => {
  let controller: IamUpdateTenantAccountByIdController;
  let handler: IamUpdateTenantAccountByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamUpdateTenantAccountByIdController],
      providers: [
        {
          provide: IamUpdateTenantAccountByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamUpdateTenantAccountByIdController>(
      IamUpdateTenantAccountByIdController,
    );
    handler = module.get<IamUpdateTenantAccountByIdHandler>(
      IamUpdateTenantAccountByIdHandler,
    );
  });

  describe('main', () => {
    test('IamUpdateTenantAccountByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a tenantAccount updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantAccountData[0])),
        );
      expect(await controller.main(iamMockTenantAccountData[0])).toBe(
        iamMockTenantAccountData[0],
      );
    });
  });
});
