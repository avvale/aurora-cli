import { IamIPermissionRepository, IamMockPermissionRepository } from '@app/iam/permission';
import { IamMinPermissionService } from '@app/iam/permission/application/min/iam-min-permission.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinPermissionService', () =>
{
    let service: IamMinPermissionService;
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
                IamMinPermissionService,
                IamMockPermissionRepository,
                {
                    provide : IamIPermissionRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamMinPermissionService);
        repository = module.get(IamIPermissionRepository);
        mockRepository = module.get(IamMockPermissionRepository);
    });

    describe('main', () =>
    {
        test('IamMinPermissionService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(repository, 'min').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.min(column))));
            expect(await service.main('id')).toBe(mockRepository.min('id'));
        });
    });
});
