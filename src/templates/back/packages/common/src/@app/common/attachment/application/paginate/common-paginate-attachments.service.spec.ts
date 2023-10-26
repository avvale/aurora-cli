import { CommonIAttachmentRepository, CommonMockAttachmentRepository } from '@app/common/attachment';
import { CommonPaginateAttachmentsService } from '@app/common/attachment/application/paginate/common-paginate-attachments.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentsService', () =>
{
    let service: CommonPaginateAttachmentsService;
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
                CommonPaginateAttachmentsService,
                CommonMockAttachmentRepository,
                {
                    provide : CommonIAttachmentRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonPaginateAttachmentsService);
        repository = module.get(CommonIAttachmentRepository);
        mockRepository = module.get(CommonMockAttachmentRepository);
    });

    describe('main', () =>
    {
        test('CommonPaginateAttachmentsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate attachments', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});
