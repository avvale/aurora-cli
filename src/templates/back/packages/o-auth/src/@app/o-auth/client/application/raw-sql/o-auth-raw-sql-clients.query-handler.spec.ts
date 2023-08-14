import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthMockClientRepository } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.repository';
import { OAuthIClientRepository } from '@app/o-auth/client/domain/o-auth-client.repository';
import { OAuthClientMapper } from '@app/o-auth/client/domain/o-auth-client.mapper';
import { OAuthRawSQLClientsQueryHandler } from './o-auth-raw-sql-clients.query-handler';
import { OAuthRawSQLClientsQuery } from './o-auth-raw-sql-clients.query';
import { OAuthRawSQLClientsService } from './o-auth-raw-sql-clients.service';

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
