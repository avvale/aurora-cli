import { IamIPermissionRepository, IamMockPermissionRepository } from '@app/iam/permission';
import { IamGetPermissionsService } from '@app/iam/permission/application/get/iam-get-permissions.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetPermissionsService', () =>
{
    let service: IamGetPermissionsService;
    let repository: IamIPermissionRepository;
    let mockRepository: IamMockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamGetPermissionsService,
                IamMockPermissionRepository,
                {
                    provide : IamIPermissionRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamGetPermissionsService);
        repository = module.get(IamIPermissionRepository);
        mockRepository = module.get(IamMockPermissionRepository);
    });

    describe('main', () =>
    {
        test('GetPermissionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get permissions', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
