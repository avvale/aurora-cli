import { IamITagRepository, IamMockTagRepository, IamRawSQLTagsQuery, IamTagMapper } from '@app/iam/tag';
import { IamRawSQLTagsQueryHandler } from '@app/iam/tag/application/raw-sql/iam-raw-sql-tags.query-handler';
import { IamRawSQLTagsService } from '@app/iam/tag/application/raw-sql/iam-raw-sql-tags.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLTagsQueryHandler', () =>
{
    let queryHandler: IamRawSQLTagsQueryHandler;
    let service: IamRawSQLTagsService;
    let repository: IamMockTagRepository;
    let mapper: IamTagMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLTagsQueryHandler,
                {
                    provide : IamITagRepository,
                    useClass: IamMockTagRepository,
                },
                {
                    provide : IamRawSQLTagsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamRawSQLTagsQueryHandler>(IamRawSQLTagsQueryHandler);
        service = module.get<IamRawSQLTagsService>(IamRawSQLTagsService);
        repository = <IamMockTagRepository>module.get<IamITagRepository>(IamITagRepository);
        mapper = new IamTagMapper();
    });

    describe('main', () =>
    {
        test('IamRawSQLTagsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tags founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamRawSQLTagsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
