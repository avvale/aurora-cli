/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetTenantsHandler, IamGetTenantsResolver } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetTenantsResolver', () => {
  let resolver: IamGetTenantsResolver;
  let handler: IamGetTenantsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamGetTenantsResolver,
        {
          provide: IamGetTenantsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamGetTenantsResolver>(IamGetTenantsResolver);
    handler = module.get<IamGetTenantsHandler>(IamGetTenantsHandler);
  });

  test('IamGetTenantsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamGetTenantsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a iamMockTenantData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTenantData)),
        );
      expect(await resolver.main()).toBe(iamMockTenantData);
    });
  });
});
