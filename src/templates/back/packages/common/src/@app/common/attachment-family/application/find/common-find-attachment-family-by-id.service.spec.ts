import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.data';
import { CommonFindAttachmentFamilyByIdService } from './common-find-attachment-family-by-id.service';
import { CommonAttachmentFamilyId } from '../../domain/value-objects';
import { CommonIAttachmentFamilyRepository } from '../../domain/common-attachment-family.repository';
import { CommonMockAttachmentFamilyRepository } from '../../infrastructure/mock/common-mock-attachment-family.repository';

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
