/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamFindPermissionRoleHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionRoleHandler', () => {
  let handler: IamFindPermissionRoleHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamFindPermissionRoleHandler,
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

    handler = module.get<IamFindPermissionRoleHandler>(
      IamFindPermissionRoleHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamFindPermissionRoleHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamFindPermissionRoleHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a permissionRole', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockPermissionRoleData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        iamMockPermissionRoleData[0],
      );
    });
  });
});
