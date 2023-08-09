import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonFindAttachmentFamilyService } from './common-find-attachment-family.service';
import { CommonIAttachmentFamilyRepository } from '../../domain/common-attachment-family.repository';
import { CommonMockAttachmentFamilyRepository } from '../../infrastructure/mock/common-mock-attachment-family.repository';

describe('CommonFindAttachmentFamilyService', () =>
{
    let service: CommonFindAttachmentFamilyService;
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
                CommonFindAttachmentFamilyService,
                CommonMockAttachmentFamilyRepository,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonFindAttachmentFamilyService);
        repository = module.get(CommonIAttachmentFamilyRepository);
        mockRepository = module.get(CommonMockAttachmentFamilyRepository);
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentFamilyService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find attachmentFamily', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
