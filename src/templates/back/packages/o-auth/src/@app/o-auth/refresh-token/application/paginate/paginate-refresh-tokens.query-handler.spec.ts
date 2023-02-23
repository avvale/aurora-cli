import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurora-ts/core';

// custom items
import { PaginateRefreshTokensQueryHandler } from './paginate-refresh-tokens.query-handler';
import { MockRefreshTokenRepository } from '@app/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.repository';
import { IRefreshTokenRepository } from '@app/o-auth/refresh-token/domain/refresh-token.repository';
import { RefreshTokenMapper } from '@app/o-auth/refresh-token/domain/refresh-token.mapper';
import { PaginateRefreshTokensQuery } from './paginate-refresh-tokens.query';
import { PaginateRefreshTokensService } from './paginate-refresh-tokens.service';

describe('PaginateRefreshTokensQueryHandler', () =>
{
    let queryHandler: PaginateRefreshTokensQueryHandler;
    let service: PaginateRefreshTokensService;
    let repository: MockRefreshTokenRepository;
    let mapper: RefreshTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateRefreshTokensQueryHandler,
                {
                    provide : IRefreshTokenRepository,
                    useClass: MockRefreshTokenRepository,
                },
                {
                    provide : PaginateRefreshTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<PaginateRefreshTokensQueryHandler>(PaginateRefreshTokensQueryHandler);
        service         = module.get<PaginateRefreshTokensService>(PaginateRefreshTokensService);
        repository      = <MockRefreshTokenRepository>module.get<IRefreshTokenRepository>(IRefreshTokenRepository);
        mapper          = new RefreshTokenMapper();
    });

    describe('main', () =>
    {
        test('PaginateRefreshTokensQueryHandler should be defined', () =>
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
                new PaginateRefreshTokensQuery(
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