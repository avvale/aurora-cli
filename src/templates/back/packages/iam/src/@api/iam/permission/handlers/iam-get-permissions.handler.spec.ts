/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamGetPermissionsHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetPermissionsHandler', () => {
  let handler: IamGetPermissionsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamGetPermissionsHandler,
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

    handler = module.get<IamGetPermissionsHandler>(IamGetPermissionsHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamGetPermissionsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamGetPermissionsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a iamMockPermissionData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockPermissionData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        iamMockPermissionData,
      );
    });
  });
});
