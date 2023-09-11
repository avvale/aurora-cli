import { OAuthFindRefreshTokenByIdQuery, OAuthIRefreshTokenRepository, oAuthMockRefreshTokenData, OAuthMockRefreshTokenRepository, OAuthRefreshTokenMapper } from '@app/o-auth/refresh-token';
import { OAuthFindRefreshTokenByIdQueryHandler } from '@app/o-auth/refresh-token/application/find/o-auth-find-refresh-token-by-id.query-handler';
import { OAuthFindRefreshTokenByIdService } from '@app/o-auth/refresh-token/application/find/o-auth-find-refresh-token-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindRefreshTokenByIdQueryHandler', () =>
{
    let queryHandler: OAuthFindRefreshTokenByIdQueryHandler;
    let service: OAuthFindRefreshTokenByIdService;
    let repository: OAuthMockRefreshTokenRepository;
    let mapper: OAuthRefreshTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindRefreshTokenByIdQueryHandler,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useClass: OAuthMockRefreshTokenRepository,
                },
                {
                    provide : OAuthFindRefreshTokenByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthFindRefreshTokenByIdQueryHandler>(OAuthFindRefreshTokenByIdQueryHandler);
        service = module.get<OAuthFindRefreshTokenByIdService>(OAuthFindRefreshTokenByIdService);
        repository = <OAuthMockRefreshTokenRepository>module.get<OAuthIRefreshTokenRepository>(OAuthIRefreshTokenRepository);
        mapper = new OAuthRefreshTokenMapper();
    });

    describe('main', () =>
    {
        test('FindRefreshTokenByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an refreshToken founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new OAuthFindRefreshTokenByIdQuery(
                    oAuthMockRefreshTokenData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
