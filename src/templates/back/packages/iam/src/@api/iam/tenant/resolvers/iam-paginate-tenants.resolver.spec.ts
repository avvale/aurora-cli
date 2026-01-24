/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamPaginateTenantsHandler,
  IamPaginateTenantsResolver,
} from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTenantsResolver', () => {
  let resolver: IamPaginateTenantsResolver;
  let handler: IamPaginateTenantsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamPaginateTenantsResolver,
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

    resolver = module.get<IamPaginateTenantsResolver>(
      IamPaginateTenantsResolver,
    );
    handler = module.get<IamPaginateTenantsHandler>(IamPaginateTenantsHandler);
  });

  test('IamPaginateTenantsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamPaginateTenantsResolver should be defined', () => {
      expect(resolver).toBeDefined();
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
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: iamMockTenantData,
      });
    });
  });
});
