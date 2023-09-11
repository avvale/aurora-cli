import { IamIPermissionRoleRepository, IamMockPermissionRoleRepository } from '@app/iam/permission-role';
import { IamGetPermissionsRolesService } from '@app/iam/permission-role/application/get/iam-get-permissions-roles.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetPermissionsRolesService', () =>
{
    let service: IamGetPermissionsRolesService;
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
                IamGetPermissionsRolesService,
                IamMockPermissionRoleRepository,
                {
                    provide : IamIPermissionRoleRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamGetPermissionsRolesService);
        repository = module.get(IamIPermissionRoleRepository);
        mockRepository = module.get(IamMockPermissionRoleRepository);
    });

    describe('main', () =>
    {
        test('GetPermissionsRolesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get permissionsRoles', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
