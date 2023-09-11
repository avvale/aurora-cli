import { IamIPermissionRepository, IamMockPermissionRepository } from '@app/iam/permission';
import { IamFindPermissionService } from '@app/iam/permission/application/find/iam-find-permission.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionService', () =>
{
    let service: IamFindPermissionService;
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
                IamFindPermissionService,
                IamMockPermissionRepository,
                {
                    provide : IamIPermissionRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamFindPermissionService);
        repository = module.get(IamIPermissionRepository);
        mockRepository = module.get(IamMockPermissionRepository);
    });

    describe('main', () =>
    {
        test('IamFindPermissionService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find permission', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
