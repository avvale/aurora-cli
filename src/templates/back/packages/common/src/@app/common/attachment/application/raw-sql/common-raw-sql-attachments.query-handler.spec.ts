import { CommonAttachmentMapper, CommonIAttachmentRepository, CommonMockAttachmentRepository, CommonRawSQLAttachmentsQuery } from '@app/common/attachment';
import { CommonRawSQLAttachmentsQueryHandler } from '@app/common/attachment/application/raw-sql/common-raw-sql-attachments.query-handler';
import { CommonRawSQLAttachmentsService } from '@app/common/attachment/application/raw-sql/common-raw-sql-attachments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLAttachmentsQueryHandler', () =>
{
    let queryHandler: CommonRawSQLAttachmentsQueryHandler;
    let service: CommonRawSQLAttachmentsService;
    let repository: CommonMockAttachmentRepository;
    let mapper: CommonAttachmentMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonRawSQLAttachmentsQueryHandler,
                {
                    provide : CommonIAttachmentRepository,
                    useClass: CommonMockAttachmentRepository,
                },
                {
                    provide : CommonRawSQLAttachmentsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonRawSQLAttachmentsQueryHandler>(CommonRawSQLAttachmentsQueryHandler);
        service = module.get<CommonRawSQLAttachmentsService>(CommonRawSQLAttachmentsService);
        repository = <CommonMockAttachmentRepository>module.get<CommonIAttachmentRepository>(CommonIAttachmentRepository);
        mapper = new CommonAttachmentMapper();
    });

    describe('main', () =>
    {
        test('CommonRawSQLAttachmentsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachments founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonRawSQLAttachmentsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
