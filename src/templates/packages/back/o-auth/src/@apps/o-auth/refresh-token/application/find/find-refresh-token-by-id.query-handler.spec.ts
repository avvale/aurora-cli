import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindRefreshTokenByIdQueryHandler } from './find-refresh-token-by-id.query-handler';
import { MockRefreshTokenRepository } from '@apps/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.repository';
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { IRefreshTokenRepository } from '@apps/o-auth/refresh-token/domain/refresh-token.repository';
import { RefreshTokenMapper } from '@apps/o-auth/refresh-token/domain/refresh-token.mapper';
import { FindRefreshTokenByIdQuery } from './find-refresh-token-by-id.query';
import { FindRefreshTokenByIdService } from './find-refresh-token-by-id.service';

describe('FindRefreshTokenByIdQueryHandler', () =>
{
    let queryHandler: FindRefreshTokenByIdQueryHandler;
    let service: FindRefreshTokenByIdService;
    let repository: MockRefreshTokenRepository;
    let mapper: RefreshTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindRefreshTokenByIdQueryHandler,
                {
                    provide : IRefreshTokenRepository,
                    useClass: MockRefreshTokenRepository,
                },
                {
                    provide : FindRefreshTokenByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindRefreshTokenByIdQueryHandler>(FindRefreshTokenByIdQueryHandler);
        service         = module.get<FindRefreshTokenByIdService>(FindRefreshTokenByIdService);
        repository      = <MockRefreshTokenRepository>module.get<IRefreshTokenRepository>(IRefreshTokenRepository);
        mapper          = new RefreshTokenMapper();
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
                new FindRefreshTokenByIdQuery(
                    refreshTokens[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});