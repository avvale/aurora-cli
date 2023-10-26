import { CommonIAttachmentRepository, CommonMockAttachmentRepository } from '@app/common/attachment';
import { CommonFindAttachmentService } from '@app/common/attachment/application/find/common-find-attachment.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentService', () =>
{
    let service: CommonFindAttachmentService;
    let repository: CommonIAttachmentRepository;
    let mockRepository: CommonMockAttachmentRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonFindAttachmentService,
                CommonMockAttachmentRepository,
                {
                    provide : CommonIAttachmentRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonFindAttachmentService);
        repository = module.get(CommonIAttachmentRepository);
        mockRepository = module.get(CommonMockAttachmentRepository);
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find attachment', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
