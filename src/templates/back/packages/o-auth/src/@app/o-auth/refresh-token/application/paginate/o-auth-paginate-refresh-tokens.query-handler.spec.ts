import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { OAuthPaginateRefreshTokensQueryHandler } from './o-auth-paginate-refresh-tokens.query-handler';
import { OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token/infrastructure/mock/o-auth-mock-refresh-token.repository';
import { OAuthIRefreshTokenRepository } from '@app/o-auth/refresh-token/domain/o-auth-refresh-token.repository';
import { OAuthRefreshTokenMapper } from '@app/o-auth/refresh-token/domain/o-auth-refresh-token.mapper';
import { OAuthPaginateRefreshTokensQuery } from './o-auth-paginate-refresh-tokens.query';
import { OAuthPaginateRefreshTokensService } from './o-auth-paginate-refresh-tokens.service';

describe('OAuthPaginateRefreshTokensQueryHandler', () =>
{
    let queryHandler: OAuthPaginateRefreshTokensQueryHandler;
    let service: OAuthPaginateRefreshTokensService;
    let repository: OAuthMockRefreshTokenRepository;
    let mapper: OAuthRefreshTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthPaginateRefreshTokensQueryHandler,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useClass: OAuthMockRefreshTokenRepository,
                },
                {
                    provide : OAuthPaginateRefreshTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthPaginateRefreshTokensQueryHandler>(OAuthPaginateRefreshTokensQueryHandler);
        service = module.get<OAuthPaginateRefreshTokensService>(OAuthPaginateRefreshTokensService);
        repository = <OAuthMockRefreshTokenRepository>module.get<OAuthIRefreshTokenRepository>(OAuthIRefreshTokenRepository);
        mapper = new OAuthRefreshTokenMapper();
    });

    describe('main', () =>
    {
        test('OAuthPaginateRefreshTokensQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an refreshTokens paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new OAuthPaginateRefreshTokensQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
