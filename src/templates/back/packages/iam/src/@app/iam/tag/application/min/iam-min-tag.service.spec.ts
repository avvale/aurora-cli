import { IamITagRepository, IamMockTagRepository } from '@app/iam/tag';
import { IamMinTagService } from '@app/iam/tag/application/min/iam-min-tag.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinTagService', () =>
{
    let service: IamMinTagService;
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
                IamMinTagService,
                IamMockTagRepository,
                {
                    provide : IamITagRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamMinTagService);
        repository = module.get(IamITagRepository);
        mockRepository = module.get(IamMockTagRepository);
    });

    describe('main', () =>
    {
        test('IamMinTagService should be defined', () =>
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
