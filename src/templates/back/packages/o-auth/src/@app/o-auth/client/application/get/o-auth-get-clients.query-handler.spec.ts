import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetClientsQueryHandler } from './o-auth-get-clients.query-handler';
import { OAuthMockClientRepository } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.repository';
import { OAuthIClientRepository } from '@app/o-auth/client/domain/o-auth-client.repository';
import { OAuthClientMapper } from '@app/o-auth/client/domain/o-auth-client.mapper';
import { OAuthGetClientsQuery } from './o-auth-get-clients.query';
import { OAuthGetClientsService } from './o-auth-get-clients.service';

describe('GetClientsQueryHandler', () =>
{
    let queryHandler: OAuthGetClientsQueryHandler;
    let service: OAuthGetClientsService;
    let repository: OAuthMockClientRepository;
    let mapper: OAuthClientMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthGetClientsQueryHandler,
                {
                    provide : OAuthIClientRepository,
                    useClass: OAuthMockClientRepository,
                },
                {
                    provide : OAuthGetClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthGetClientsQueryHandler>(OAuthGetClientsQueryHandler);
        service = module.get<OAuthGetClientsService>(OAuthGetClientsService);
        repository = <OAuthMockClientRepository>module.get<OAuthIClientRepository>(OAuthIClientRepository);
        mapper = new OAuthClientMapper();
    });

    describe('main', () =>
    {
        test('OAuthGetClientsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an clients founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new OAuthGetClientsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});