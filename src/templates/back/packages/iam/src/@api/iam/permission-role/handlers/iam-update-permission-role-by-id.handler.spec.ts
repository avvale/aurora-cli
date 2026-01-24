/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamUpdatePermissionRoleByIdInput } from '@api/graphql';
import { IamUpdatePermissionRoleByIdHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionRoleByIdHandler', () => {
  let handler: IamUpdatePermissionRoleByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdatePermissionRoleByIdHandler,
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

    handler = module.get<IamUpdatePermissionRoleByIdHandler>(
      IamUpdatePermissionRoleByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamUpdatePermissionRoleByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdatePermissionRoleByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a permissionRole updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockPermissionRoleData[0])),
        );
      expect(
        await handler.main(
          <IamUpdatePermissionRoleByIdInput>iamMockPermissionRoleData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(iamMockPermissionRoleData[0]);
    });
  });
});
