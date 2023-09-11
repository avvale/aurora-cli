import { OAuthApplicationClientMapper, OAuthIApplicationClientRepository, OAuthMockApplicationClientRepository, OAuthRawSQLApplicationsClientsQuery } from '@app/o-auth/application-client';
import { OAuthRawSQLApplicationsClientsQueryHandler } from '@app/o-auth/application-client/application/raw-sql/o-auth-raw-sql-applications-clients.query-handler';
import { OAuthRawSQLApplicationsClientsService } from '@app/o-auth/application-client/application/raw-sql/o-auth-raw-sql-applications-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLApplicationsClientsQueryHandler', () =>
{
    let queryHandler: OAuthRawSQLApplicationsClientsQueryHandler;
    let service: OAuthRawSQLApplicationsClientsService;
    let repository: OAuthMockApplicationClientRepository;
    let mapper: OAuthApplicationClientMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthRawSQLApplicationsClientsQueryHandler,
                {
                    provide : OAuthIApplicationClientRepository,
                    useClass: OAuthMockApplicationClientRepository,
                },
                {
                    provide : OAuthRawSQLApplicationsClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthRawSQLApplicationsClientsQueryHandler>(OAuthRawSQLApplicationsClientsQueryHandler);
        service = module.get<OAuthRawSQLApplicationsClientsService>(OAuthRawSQLApplicationsClientsService);
        repository = <OAuthMockApplicationClientRepository>module.get<OAuthIApplicationClientRepository>(OAuthIApplicationClientRepository);
        mapper = new OAuthApplicationClientMapper();
    });

    describe('main', () =>
    {
        test('OAuthRawSQLApplicationsClientsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationsClients founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new OAuthRawSQLApplicationsClientsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
