import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetRefreshTokensQueryHandler } from './o-auth-get-refresh-tokens.query-handler';
import { OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token/infrastructure/mock/o-auth-mock-refresh-token.repository';
import { OAuthIRefreshTokenRepository } from '@app/o-auth/refresh-token/domain/o-auth-refresh-token.repository';
import { OAuthRefreshTokenMapper } from '@app/o-auth/refresh-token/domain/o-auth-refresh-token.mapper';
import { OAuthGetRefreshTokensQuery } from './o-auth-get-refresh-tokens.query';
import { OAuthGetRefreshTokensService } from './o-auth-get-refresh-tokens.service';

describe('GetRefreshTokensQueryHandler', () =>
{
    let queryHandler: OAuthGetRefreshTokensQueryHandler;
    let service: OAuthGetRefreshTokensService;
    let repository: OAuthMockRefreshTokenRepository;
    let mapper: OAuthRefreshTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthGetRefreshTokensQueryHandler,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useClass: OAuthMockRefreshTokenRepository,
                },
                {
                    provide : OAuthGetRefreshTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthGetRefreshTokensQueryHandler>(OAuthGetRefreshTokensQueryHandler);
        service = module.get<OAuthGetRefreshTokensService>(OAuthGetRefreshTokensService);
        repository = <OAuthMockRefreshTokenRepository>module.get<OAuthIRefreshTokenRepository>(OAuthIRefreshTokenRepository);
        mapper = new OAuthRefreshTokenMapper();
    });

    describe('main', () =>
    {
        test('OAuthGetRefreshTokensQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an refreshTokens founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new OAuthGetRefreshTokensQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});