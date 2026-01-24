/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamIPermissionRoleRepository,
  IamMockPermissionRoleRepository,
} from '@app/iam/permission-role';
import { IamPaginatePermissionsRolesService } from '@app/iam/permission-role/application/paginate/iam-paginate-permissions-roles.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginatePermissionsRolesService', () => {
  let service: IamPaginatePermissionsRolesService;
  let repository: IamIPermissionRoleRepository;
  let mockRepository: IamMockPermissionRoleRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamPaginatePermissionsRolesService,
        IamMockPermissionRoleRepository,
        {
          provide: IamIPermissionRoleRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamPaginatePermissionsRolesService);
    repository = module.get(IamIPermissionRoleRepository);
    mockRepository = module.get(IamMockPermissionRoleRepository);
  });

  describe('main', () => {
    test('IamPaginatePermissionsRolesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate permissionsRoles', async () => {
      jest.spyOn(repository, 'paginate').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: mockRepository.collectionSource.slice(0, 10).length,
              count: mockRepository.collectionSource.slice(0, 10).length,
              rows: mockRepository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await service.main({
          offset: 0,
          limit: 10,
        }),
      ).toStrictEqual({
        total: mockRepository.collectionSource.slice(0, 10).length,
        count: mockRepository.collectionSource.slice(0, 10).length,
        rows: mockRepository.collectionSource.slice(0, 10),
      });
    });
  });
});
