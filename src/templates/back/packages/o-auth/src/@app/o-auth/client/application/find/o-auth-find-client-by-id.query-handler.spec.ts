import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindClientByIdQueryHandler } from './o-auth-find-client-by-id.query-handler';
import { OAuthMockClientRepository } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.repository';
import { oAuthMockClientData } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.data';
import { OAuthIClientRepository } from '@app/o-auth/client/domain/o-auth-client.repository';
import { OAuthClientMapper } from '@app/o-auth/client/domain/o-auth-client.mapper';
import { OAuthFindClientByIdQuery } from './o-auth-find-client-by-id.query';
import { OAuthFindClientByIdService } from './o-auth-find-client-by-id.service';

describe('OAuthFindClientByIdQueryHandler', () =>
{
    let queryHandler: OAuthFindClientByIdQueryHandler;
    let service: OAuthFindClientByIdService;
    let repository: OAuthMockClientRepository;
    let mapper: OAuthClientMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindClientByIdQueryHandler,
                {
                    provide : OAuthIClientRepository,
                    useClass: OAuthMockClientRepository,
                },
                {
                    provide : OAuthFindClientByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthFindClientByIdQueryHandler>(OAuthFindClientByIdQueryHandler);
        service = module.get<OAuthFindClientByIdService>(OAuthFindClientByIdService);
        repository = <OAuthMockClientRepository>module.get<OAuthIClientRepository>(OAuthIClientRepository);
        mapper = new OAuthClientMapper();
    });

    describe('main', () =>
    {
        test('FindClientByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an client founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new OAuthFindClientByIdQuery(
                    oAuthMockClientData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
