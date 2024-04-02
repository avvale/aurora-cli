import { IamITagRepository, IamMockTagRepository } from '@app/iam/tag';
import { IamSumTagService } from '@app/iam/tag/application/sum/iam-sum-tag.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumTagService', () =>
{
    let service: IamSumTagService;
    let repository: IamITagRepository;
    let mockRepository: IamMockTagRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamSumTagService,
                IamMockTagRepository,
                {
                    provide : IamITagRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamSumTagService);
        repository = module.get(IamITagRepository);
        mockRepository = module.get(IamMockTagRepository);
    });

    describe('main', () =>
    {
        test('IamSumTagService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(repository, 'sum').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.sum(column))));
            expect(await service.main('id')).toBe(mockRepository.sum('id'));
        });
    });
});
