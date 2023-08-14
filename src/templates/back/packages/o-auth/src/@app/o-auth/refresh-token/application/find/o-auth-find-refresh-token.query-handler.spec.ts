import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindRefreshTokenQueryHandler } from './o-auth-find-refresh-token.query-handler';
import { OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token/infrastructure/mock/o-auth-mock-refresh-token.repository';
import { OAuthIRefreshTokenRepository } from '@app/o-auth/refresh-token/domain/o-auth-refresh-token.repository';
import { OAuthRefreshTokenMapper } from '@app/o-auth/refresh-token/domain/o-auth-refresh-token.mapper';
import { OAuthFindRefreshTokenQuery } from './o-auth-find-refresh-token.query';
import { OAuthFindRefreshTokenService } from './o-auth-find-refresh-token.service';

describe('OAuthFindRefreshTokenQueryHandler', () =>
{
    let queryHandler: OAuthFindRefreshTokenQueryHandler;
    let service: OAuthFindRefreshTokenService;
    let repository: OAuthMockRefreshTokenRepository;
    let mapper: OAuthRefreshTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindRefreshTokenQueryHandler,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useClass: OAuthMockRefreshTokenRepository,
                },
                {
                    provide : OAuthFindRefreshTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthFindRefreshTokenQueryHandler>(OAuthFindRefreshTokenQueryHandler);
        service = module.get<OAuthFindRefreshTokenService>(OAuthFindRefreshTokenService);
        repository = <OAuthMockRefreshTokenRepository>module.get<OAuthIRefreshTokenRepository>(OAuthIRefreshTokenRepository);
        mapper = new OAuthRefreshTokenMapper();
    });

    describe('main', () =>
    {
        test('OAuthFindRefreshTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an refreshToken founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new OAuthFindRefreshTokenQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
