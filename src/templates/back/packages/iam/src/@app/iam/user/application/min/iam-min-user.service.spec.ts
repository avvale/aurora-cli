import { IamIUserRepository, IamMockUserRepository } from '@app/iam/user';
import { IamMinUserService } from '@app/iam/user/application/min/iam-min-user.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinUserService', () =>
{
    let service: IamMinUserService;
    let repository: IamIUserRepository;
    let mockRepository: IamMockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamMinUserService,
                IamMockUserRepository,
                {
                    provide : IamIUserRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamMinUserService);
        repository = module.get(IamIUserRepository);
        mockRepository = module.get(IamMockUserRepository);
    });

    describe('main', () =>
    {
        test('IamMinUserService should be defined', () =>
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
