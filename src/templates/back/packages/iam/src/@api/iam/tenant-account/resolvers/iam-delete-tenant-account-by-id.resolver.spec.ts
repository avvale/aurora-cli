/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamDeleteTenantAccountByIdHandler,
  IamDeleteTenantAccountByIdResolver,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantAccountByIdResolver', () => {
  let resolver: IamDeleteTenantAccountByIdResolver;
  let handler: IamDeleteTenantAccountByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteTenantAccountByIdResolver,
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

    resolver = module.get<IamDeleteTenantAccountByIdResolver>(
      IamDeleteTenantAccountByIdResolver,
    );
    handler = module.get<IamDeleteTenantAccountByIdHandler>(
      IamDeleteTenantAccountByIdHandler,
    );
  });

  test('IamDeleteTenantAccountByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteTenantAccountByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an tenantAccount deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantAccountData[0])),
        );
      expect(await resolver.main(iamMockTenantAccountData[0].id)).toBe(
        iamMockTenantAccountData[0],
      );
    });
  });
});
