import { OAuthApplicationMapper, OAuthIApplicationRepository, OAuthMockApplicationRepository, OAuthRawSQLApplicationsQuery } from '@app/o-auth/application';
import { OAuthRawSQLApplicationsQueryHandler } from '@app/o-auth/application/application/raw-sql/o-auth-raw-sql-applications.query-handler';
import { OAuthRawSQLApplicationsService } from '@app/o-auth/application/application/raw-sql/o-auth-raw-sql-applications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLApplicationsQueryHandler', () =>
{
    let queryHandler: OAuthRawSQLApplicationsQueryHandler;
    let service: OAuthRawSQLApplicationsService;
    let repository: OAuthMockApplicationRepository;
    let mapper: OAuthApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthRawSQLApplicationsQueryHandler,
                {
                    provide : OAuthIApplicationRepository,
                    useClass: OAuthMockApplicationRepository,
                },
                {
                    provide : OAuthRawSQLApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthRawSQLApplicationsQueryHandler>(OAuthRawSQLApplicationsQueryHandler);
        service = module.get<OAuthRawSQLApplicationsService>(OAuthRawSQLApplicationsService);
        repository = <OAuthMockApplicationRepository>module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository);
        mapper = new OAuthApplicationMapper();
    });

    describe('main', () =>
    {
        test('OAuthRawSQLApplicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applications founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new OAuthRawSQLApplicationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
