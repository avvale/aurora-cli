import { IamIRoleRepository, IamMockRoleRepository } from '@app/iam/role';
import { IamMinRoleService } from '@app/iam/role/application/min/iam-min-role.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinRoleService', () =>
{
    let service: IamMinRoleService;
    let repository: IamIRoleRepository;
    let mockRepository: IamMockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamMinRoleService,
                IamMockRoleRepository,
                {
                    provide : IamIRoleRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamMinRoleService);
        repository = module.get(IamIRoleRepository);
        mockRepository = module.get(IamMockRoleRepository);
    });

    describe('main', () =>
    {
        test('IamMinRoleService should be defined', () =>
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
