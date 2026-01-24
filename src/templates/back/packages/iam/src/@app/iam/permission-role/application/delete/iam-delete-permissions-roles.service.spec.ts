/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamIPermissionRoleRepository,
  IamMockPermissionRoleRepository,
} from '@app/iam/permission-role';
import { IamDeletePermissionsRolesService } from '@app/iam/permission-role/application/delete/iam-delete-permissions-roles.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionsRolesService', () => {
  let service: IamDeletePermissionsRolesService;
  let repository: IamIPermissionRoleRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamDeletePermissionsRolesService,
        IamMockPermissionRoleRepository,
        {
          provide: IamIPermissionRoleRepository,
          useValue: {
            get: () => {
              /**/
            },
            delete: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamDeletePermissionsRolesService);
    repository = module.get(IamIPermissionRoleRepository);
  });

  describe('main', () => {
    test('IamDeletePermissionsRolesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete permissionRole and emit event', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      expect(await service.main({}, {})).toBe(undefined);
    });
  });
});
