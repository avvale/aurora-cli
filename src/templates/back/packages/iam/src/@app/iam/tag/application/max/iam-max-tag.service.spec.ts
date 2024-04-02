import { IamITagRepository, IamMockTagRepository } from '@app/iam/tag';
import { IamMaxTagService } from '@app/iam/tag/application/max/iam-max-tag.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxTagService', () =>
{
    let service: IamMaxTagService;
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
                IamMaxTagService,
                IamMockTagRepository,
                {
                    provide : IamITagRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamMaxTagService);
        repository = module.get(IamITagRepository);
        mockRepository = module.get(IamMockTagRepository);
    });

    describe('main', () =>
    {
        test('IamMaxTagService should be defined', () =>
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
