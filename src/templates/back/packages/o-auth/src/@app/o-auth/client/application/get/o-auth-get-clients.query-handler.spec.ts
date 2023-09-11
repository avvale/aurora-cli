import { OAuthClientMapper, OAuthGetClientsQuery, OAuthIClientRepository, OAuthMockClientRepository } from '@app/o-auth/client';
import { OAuthGetClientsQueryHandler } from '@app/o-auth/client/application/get/o-auth-get-clients.query-handler';
import { OAuthGetClientsService } from '@app/o-auth/client/application/get/o-auth-get-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

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
