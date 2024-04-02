import { IamITagRepository, IamMockTagRepository } from '@app/iam/tag';
import { IamCountTagService } from '@app/iam/tag/application/count/iam-count-tag.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountTagService', () =>
{
    let service: IamCountTagService;
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
                IamCountTagService,
                IamMockTagRepository,
                {
                    provide : IamITagRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCountTagService);
        repository = module.get(IamITagRepository);
        mockRepository = module.get(IamMockTagRepository);
    });

    describe('main', () =>
    {
        test('IamCountTagService should be defined', () =>
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
