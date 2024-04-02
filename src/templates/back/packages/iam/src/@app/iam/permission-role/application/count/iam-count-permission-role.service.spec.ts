import { IamIPermissionRoleRepository, IamMockPermissionRoleRepository } from '@app/iam/permission-role';
import { IamCountPermissionRoleService } from '@app/iam/permission-role/application/count/iam-count-permission-role.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountPermissionRoleService', () =>
{
    let service: IamCountPermissionRoleService;
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
                IamCountPermissionRoleService,
                IamMockPermissionRoleRepository,
                {
                    provide : IamIPermissionRoleRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCountPermissionRoleService);
        repository = module.get(IamIPermissionRoleRepository);
        mockRepository = module.get(IamMockPermissionRoleRepository);
    });

    describe('main', () =>
    {
        test('IamCountPermissionRoleService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () =>
        {
            jest.spyOn(repository, 'count').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource.length)));
            expect(await service.main()).toBe(mockRepository.collectionSource.length);
        });
    });
});
