/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import {
  IamIPermissionRepository,
  IamMockPermissionRepository,
} from '@app/iam/permission';
import { IamPaginatePermissionsService } from '@app/iam/permission/application/paginate/iam-paginate-permissions.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginatePermissionsService', () => {
  let service: IamPaginatePermissionsService;
  let repository: IamIPermissionRepository;
  let mockRepository: IamMockPermissionRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamPaginatePermissionsService,
        IamMockPermissionRepository,
        {
          provide: IamIPermissionRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamPaginatePermissionsService);
    repository = module.get(IamIPermissionRepository);
    mockRepository = module.get(IamMockPermissionRepository);
  });

  describe('main', () => {
    test('IamPaginatePermissionsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate permissions', async () => {
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
