/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamDeleteTenantsHandler,
  IamDeleteTenantsResolver,
} from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantsResolver', () => {
  let resolver: IamDeleteTenantsResolver;
  let handler: IamDeleteTenantsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteTenantsResolver,
        {
          provide: IamDeleteTenantsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamDeleteTenantsResolver>(IamDeleteTenantsResolver);
    handler = module.get<IamDeleteTenantsHandler>(IamDeleteTenantsHandler);
  });

  test('IamDeleteTenantsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteTenantsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an iamMockTenantData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantData)),
        );
      expect(await resolver.main()).toBe(iamMockTenantData);
    });
  });
});
