import { CommonAttachmentLibraryMapper, CommonIAttachmentLibraryRepository, CommonMockAttachmentLibraryRepository, CommonRawSQLAttachmentLibrariesQuery } from '@app/common/attachment-library';
import { CommonRawSQLAttachmentLibrariesQueryHandler } from '@app/common/attachment-library/application/raw-sql/common-raw-sql-attachment-libraries.query-handler';
import { CommonRawSQLAttachmentLibrariesService } from '@app/common/attachment-library/application/raw-sql/common-raw-sql-attachment-libraries.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLAttachmentLibrariesQueryHandler', () =>
{
    let queryHandler: CommonRawSQLAttachmentLibrariesQueryHandler;
    let service: CommonRawSQLAttachmentLibrariesService;
    let repository: CommonMockAttachmentLibraryRepository;
    let mapper: CommonAttachmentLibraryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonRawSQLAttachmentLibrariesQueryHandler,
                {
                    provide : CommonIAttachmentLibraryRepository,
                    useClass: CommonMockAttachmentLibraryRepository,
                },
                {
                    provide : CommonRawSQLAttachmentLibrariesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonRawSQLAttachmentLibrariesQueryHandler>(CommonRawSQLAttachmentLibrariesQueryHandler);
        service = module.get<CommonRawSQLAttachmentLibrariesService>(CommonRawSQLAttachmentLibrariesService);
        repository = <CommonMockAttachmentLibraryRepository>module.get<CommonIAttachmentLibraryRepository>(CommonIAttachmentLibraryRepository);
        mapper = new CommonAttachmentLibraryMapper();
    });

    describe('main', () =>
    {
        test('CommonRawSQLAttachmentLibrariesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentLibraries founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonRawSQLAttachmentLibrariesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
