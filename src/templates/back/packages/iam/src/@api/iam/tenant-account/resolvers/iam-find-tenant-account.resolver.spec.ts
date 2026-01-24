/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamFindTenantAccountHandler,
  IamFindTenantAccountResolver,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantAccountResolver', () => {
  let resolver: IamFindTenantAccountResolver;
  let handler: IamFindTenantAccountHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamFindTenantAccountResolver,
        {
          provide: IamFindTenantAccountHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamFindTenantAccountResolver>(
      IamFindTenantAccountResolver,
    );
    handler = module.get<IamFindTenantAccountHandler>(
      IamFindTenantAccountHandler,
    );
  });

  test('IamFindTenantAccountResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamFindTenantAccountResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a tenantAccount', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantAccountData[0])),
        );
      expect(await resolver.main()).toBe(iamMockTenantAccountData[0]);
    });
  });
});
