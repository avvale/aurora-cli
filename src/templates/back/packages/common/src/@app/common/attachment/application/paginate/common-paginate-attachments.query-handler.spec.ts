import { CommonIAttachmentRepository, CommonMockAttachmentRepository, CommonPaginateAttachmentsQuery } from '@app/common/attachment';
import { CommonPaginateAttachmentsQueryHandler } from '@app/common/attachment/application/paginate/common-paginate-attachments.query-handler';
import { CommonPaginateAttachmentsService } from '@app/common/attachment/application/paginate/common-paginate-attachments.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentsQueryHandler', () =>
{
    let queryHandler: CommonPaginateAttachmentsQueryHandler;
    let service: CommonPaginateAttachmentsService;
    let repository: CommonMockAttachmentRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonPaginateAttachmentsQueryHandler,
                {
                    provide : CommonIAttachmentRepository,
                    useClass: CommonMockAttachmentRepository,
                },
                {
                    provide : CommonPaginateAttachmentsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonPaginateAttachmentsQueryHandler>(CommonPaginateAttachmentsQueryHandler);
        service = module.get<CommonPaginateAttachmentsService>(CommonPaginateAttachmentsService);
        repository = <CommonMockAttachmentRepository>module.get<CommonIAttachmentRepository>(CommonIAttachmentRepository);
    });

    describe('main', () =>
    {
        test('CommonPaginateAttachmentsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachments paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new CommonPaginateAttachmentsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
