/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import {
  IamPaginatePermissionsHandler,
  IamPaginatePermissionsResolver,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginatePermissionsResolver', () => {
  let resolver: IamPaginatePermissionsResolver;
  let handler: IamPaginatePermissionsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamPaginatePermissionsResolver,
        {
          provide: IamPaginatePermissionsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamPaginatePermissionsResolver>(
      IamPaginatePermissionsResolver,
    );
    handler = module.get<IamPaginatePermissionsHandler>(
      IamPaginatePermissionsHandler,
    );
  });

  test('IamPaginatePermissionsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamPaginatePermissionsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a iamMockPermissionData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: iamMockPermissionData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: iamMockPermissionData,
      });
    });
  });
});
