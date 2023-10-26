import { CommonIAttachmentLibraryRepository, commonMockAttachmentLibraryData, CommonMockAttachmentLibraryRepository } from '@app/common/attachment-library';
import { CommonFindAttachmentLibraryByIdService } from '@app/common/attachment-library/application/find/common-find-attachment-library-by-id.service';
import { CommonAttachmentLibraryId } from '@app/common/attachment-library/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentLibraryByIdService', () =>
{
    let service: CommonFindAttachmentLibraryByIdService;
    let repository: CommonIAttachmentLibraryRepository;
    let mockRepository: CommonMockAttachmentLibraryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonFindAttachmentLibraryByIdService,
                CommonMockAttachmentLibraryRepository,
                {
                    provide : CommonIAttachmentLibraryRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonFindAttachmentLibraryByIdService);
        repository = module.get(CommonIAttachmentLibraryRepository);
        mockRepository = module.get(CommonMockAttachmentLibraryRepository);
    });

    describe('main', () =>
    {
        test('FindAttachmentLibraryByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find attachmentLibrary by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new CommonAttachmentLibraryId(commonMockAttachmentLibraryData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
