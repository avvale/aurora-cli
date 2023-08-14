import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonRawSQLAttachmentFamiliesService } from './common-raw-sql-attachment-families.service';
import { CommonIAttachmentFamilyRepository } from '../../domain/common-attachment-family.repository';
import { CommonMockAttachmentFamilyRepository } from '../../infrastructure/mock/common-mock-attachment-family.repository';

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
