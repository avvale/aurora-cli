/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamDeletePermissionsRolesHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionsRolesHandler', () => {
  let handler: IamDeletePermissionsRolesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeletePermissionsRolesHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<IamDeletePermissionsRolesHandler>(
      IamDeletePermissionsRolesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamDeletePermissionsRolesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamDeletePermissionsRolesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an iamMockPermissionRoleData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockPermissionRoleData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        iamMockPermissionRoleData,
      );
    });
  });
});
