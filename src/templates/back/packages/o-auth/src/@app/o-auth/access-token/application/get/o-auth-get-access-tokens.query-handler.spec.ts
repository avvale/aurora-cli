import {
    OAuthAccessTokenMapper,
    OAuthGetAccessTokensQuery,
    OAuthIAccessTokenRepository,
    OAuthMockAccessTokenRepository,
} from '@app/o-auth/access-token';
import { OAuthGetAccessTokensQueryHandler } from '@app/o-auth/access-token/application/get/o-auth-get-access-tokens.query-handler';
import { OAuthGetAccessTokensService } from '@app/o-auth/access-token/application/get/o-auth-get-access-tokens.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetAccessTokensQueryHandler', () => {
    let queryHandler: OAuthGetAccessTokensQueryHandler;
    let service: OAuthGetAccessTokensService;
    let repository: OAuthMockAccessTokenRepository;
    let mapper: OAuthAccessTokenMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthGetAccessTokensQueryHandler,
                {
                    provide: OAuthIAccessTokenRepository,
                    useClass: OAuthMockAccessTokenRepository,
                },
                {
                    provide: OAuthGetAccessTokensService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<OAuthGetAccessTokensQueryHandler>(
            OAuthGetAccessTokensQueryHandler,
        );
        service = module.get<OAuthGetAccessTokensService>(
            OAuthGetAccessTokensService,
        );
        repository = <OAuthMockAccessTokenRepository>(
            module.get<OAuthIAccessTokenRepository>(OAuthIAccessTokenRepository)
        );
        mapper = new OAuthAccessTokenMapper();
    });

    describe('main', () => {
        test('OAuthGetAccessTokensQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accessTokens founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource),
                    ),
            );
            expect(
                await queryHandler.execute(new OAuthGetAccessTokensQuery()),
            ).toStrictEqual(
                mapper.mapAggregatesToResponses(repository.collectionSource),
            );
        });
    });
});
