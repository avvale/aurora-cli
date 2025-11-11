import {
    OAuthClientMapper,
    OAuthFindClientQuery,
    OAuthIClientRepository,
    OAuthMockClientRepository,
} from '@app/o-auth/client';
import { OAuthFindClientQueryHandler } from '@app/o-auth/client/application/find/o-auth-find-client.query-handler';
import { OAuthFindClientService } from '@app/o-auth/client/application/find/o-auth-find-client.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindClientQueryHandler', () => {
    let queryHandler: OAuthFindClientQueryHandler;
    let service: OAuthFindClientService;
    let repository: OAuthMockClientRepository;
    let mapper: OAuthClientMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindClientQueryHandler,
                {
                    provide: OAuthIClientRepository,
                    useClass: OAuthMockClientRepository,
                },
                {
                    provide: OAuthFindClientService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<OAuthFindClientQueryHandler>(
            OAuthFindClientQueryHandler,
        );
        service = module.get<OAuthFindClientService>(OAuthFindClientService);
        repository = <OAuthMockClientRepository>(
            module.get<OAuthIClientRepository>(OAuthIClientRepository)
        );
        mapper = new OAuthClientMapper();
    });

    describe('main', () => {
        test('OAuthFindClientQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an client founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(new OAuthFindClientQuery()),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
