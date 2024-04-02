import { IamIPermissionRoleRepository, IamMockPermissionRoleRepository } from '@app/iam/permission-role';
import { IamMaxPermissionRoleService } from '@app/iam/permission-role/application/max/iam-max-permission-role.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxPermissionRoleService', () =>
{
    let service: IamMaxPermissionRoleService;
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
                IamMaxPermissionRoleService,
                IamMockPermissionRoleRepository,
                {
                    provide : IamIPermissionRoleRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamMaxPermissionRoleService);
        repository = module.get(IamIPermissionRoleRepository);
        mockRepository = module.get(IamMockPermissionRoleRepository);
    });

    describe('main', () =>
    {
        test('IamMaxPermissionRoleService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(repository, 'max').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.max(column))));
            expect(await service.main('id')).toBe(mockRepository.max('id'));
        });
    });
});
