import { CommonIAttachmentFamilyRepository, commonMockAttachmentFamilyData, CommonMockAttachmentFamilyRepository } from '@app/common/attachment-family';
import { CommonFindAttachmentFamilyByIdService } from '@app/common/attachment-family/application/find/common-find-attachment-family-by-id.service';
import { CommonAttachmentFamilyId } from '@app/common/attachment-family/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentFamilyByIdService', () =>
{
    let service: CommonFindAttachmentFamilyByIdService;
    let repository: CommonIAttachmentFamilyRepository;
    let mockRepository: CommonMockAttachmentFamilyRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonFindAttachmentFamilyByIdService,
                CommonMockAttachmentFamilyRepository,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonFindAttachmentFamilyByIdService);
        repository = module.get(CommonIAttachmentFamilyRepository);
        mockRepository = module.get(CommonMockAttachmentFamilyRepository);
    });

    describe('main', () =>
    {
        test('FindAttachmentFamilyByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find attachmentFamily by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new CommonAttachmentFamilyId(commonMockAttachmentFamilyData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
