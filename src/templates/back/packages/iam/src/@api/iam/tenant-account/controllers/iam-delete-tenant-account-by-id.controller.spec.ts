/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamDeleteTenantAccountByIdController,
  IamDeleteTenantAccountByIdHandler,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantAccountByIdController', () => {
  let controller: IamDeleteTenantAccountByIdController;
  let handler: IamDeleteTenantAccountByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamDeleteTenantAccountByIdController],
      providers: [
        {
          provide: IamDeleteTenantAccountByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamDeleteTenantAccountByIdController>(
      IamDeleteTenantAccountByIdController,
    );
    handler = module.get<IamDeleteTenantAccountByIdHandler>(
      IamDeleteTenantAccountByIdHandler,
    );
  });

  describe('main', () => {
    test('IamDeleteTenantAccountByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an tenantAccount deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantAccountData[0])),
        );
      expect(await controller.main(iamMockTenantAccountData[0].id)).toBe(
        iamMockTenantAccountData[0],
      );
    });
  });
});
