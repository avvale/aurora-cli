import { IamIPermissionRoleRepository, IamMockPermissionRoleRepository } from '@app/iam/permission-role';
import { IamFindPermissionRoleService } from '@app/iam/permission-role/application/find/iam-find-permission-role.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionRoleService', () =>
{
    let service: IamFindPermissionRoleService;
    let repository: IamIPermissionRoleRepository;
    let mockRepository: IamMockPermissionRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindPermissionRoleService,
                IamMockPermissionRoleRepository,
                {
                    provide : IamIPermissionRoleRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamFindPermissionRoleService);
        repository = module.get(IamIPermissionRoleRepository);
        mockRepository = module.get(IamMockPermissionRoleRepository);
    });

    describe('main', () =>
    {
        test('IamFindPermissionRoleService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find permissionRole', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
