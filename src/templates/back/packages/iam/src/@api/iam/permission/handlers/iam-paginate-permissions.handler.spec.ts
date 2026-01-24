/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamPaginatePermissionsHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginatePermissionsHandler', () => {
  let handler: IamPaginatePermissionsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamPaginatePermissionsHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<IamPaginatePermissionsHandler>(
      IamPaginatePermissionsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamPaginatePermissionsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamPaginatePermissionsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a permissions', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: iamMockPermissionData.length,
              count: iamMockPermissionData.length,
              rows: iamMockPermissionData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: iamMockPermissionData.length,
        count: iamMockPermissionData.length,
        rows: iamMockPermissionData,
      });
    });
  });
});
