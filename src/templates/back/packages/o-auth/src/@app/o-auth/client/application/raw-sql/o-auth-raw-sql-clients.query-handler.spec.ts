import { OAuthClientMapper, OAuthIClientRepository, OAuthMockClientRepository, OAuthRawSQLClientsQuery } from '@app/o-auth/client';
import { OAuthRawSQLClientsQueryHandler } from '@app/o-auth/client/application/raw-sql/o-auth-raw-sql-clients.query-handler';
import { OAuthRawSQLClientsService } from '@app/o-auth/client/application/raw-sql/o-auth-raw-sql-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLClientsQueryHandler', () =>
{
    let queryHandler: OAuthRawSQLClientsQueryHandler;
    let service: OAuthRawSQLClientsService;
    let repository: OAuthMockClientRepository;
    let mapper: OAuthClientMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthRawSQLClientsQueryHandler,
                {
                    provide : OAuthIClientRepository,
                    useClass: OAuthMockClientRepository,
                },
                {
                    provide : OAuthRawSQLClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthRawSQLClientsQueryHandler>(OAuthRawSQLClientsQueryHandler);
        service = module.get<OAuthRawSQLClientsService>(OAuthRawSQLClientsService);
        repository = <OAuthMockClientRepository>module.get<OAuthIClientRepository>(OAuthIClientRepository);
        mapper = new OAuthClientMapper();
    });

    describe('main', () =>
    {
        test('OAuthRawSQLClientsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an clients founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new OAuthRawSQLClientsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
