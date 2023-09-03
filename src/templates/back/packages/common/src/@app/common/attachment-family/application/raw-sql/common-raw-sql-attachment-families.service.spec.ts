import { CommonIAttachmentFamilyRepository, CommonMockAttachmentFamilyRepository } from '@app/common/attachment-family';
import { CommonRawSQLAttachmentFamiliesService } from '@app/common/attachment-family/application/raw-sql/common-raw-sql-attachment-families.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonRawSQLAttachmentFamiliesService ', () =>
{
    let service: CommonRawSQLAttachmentFamiliesService ;
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
                CommonRawSQLAttachmentFamiliesService ,
                CommonMockAttachmentFamilyRepository,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CommonRawSQLAttachmentFamiliesService );
        repository      = module.get(CommonIAttachmentFamilyRepository);
        mockRepository  = module.get(CommonMockAttachmentFamilyRepository);
    });

    describe('main', () =>
    {
        test('RawSQLAttachmentFamiliesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get attachmentFamilies', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
