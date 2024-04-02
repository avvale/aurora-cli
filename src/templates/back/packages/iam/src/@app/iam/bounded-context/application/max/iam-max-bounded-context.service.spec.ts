import { IamIBoundedContextRepository, IamMockBoundedContextRepository } from '@app/iam/bounded-context';
import { IamMaxBoundedContextService } from '@app/iam/bounded-context/application/max/iam-max-bounded-context.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxBoundedContextService', () =>
{
    let service: IamMaxBoundedContextService;
    let repository: IamIBoundedContextRepository;
    let mockRepository: IamMockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamMaxBoundedContextService,
                IamMockBoundedContextRepository,
                {
                    provide : IamIBoundedContextRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamMaxBoundedContextService);
        repository = module.get(IamIBoundedContextRepository);
        mockRepository = module.get(IamMockBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('IamMaxBoundedContextService should be defined', () =>
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
