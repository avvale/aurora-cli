import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockRefreshTokenRepository } from '@app/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.repository';
import { IRefreshTokenRepository } from '@app/o-auth/refresh-token/domain/refresh-token.repository';
import { RefreshTokenMapper } from '@app/o-auth/refresh-token/domain/refresh-token.mapper';
import { RawSQLRefreshTokensQueryHandler } from './raw-sql-refresh-tokens.query-handler';
import { RawSQLRefreshTokensQuery } from './raw-sql-refresh-tokens.query';
import { RawSQLRefreshTokensService } from './raw-sql-refresh-tokens.service';

describe('RawSQLRefreshTokensQueryHandler', () =>
{
    let queryHandler: RawSQLRefreshTokensQueryHandler;
    let service: RawSQLRefreshTokensService;
    let repository: MockRefreshTokenRepository;
    let mapper: RefreshTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLRefreshTokensQueryHandler,
                {
                    provide : IRefreshTokenRepository,
                    useClass: MockRefreshTokenRepository,
                },
                {
                    provide : RawSQLRefreshTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLRefreshTokensQueryHandler>(RawSQLRefreshTokensQueryHandler);
        service         = module.get<RawSQLRefreshTokensService>(RawSQLRefreshTokensService);
        repository      = <MockRefreshTokenRepository>module.get<IRefreshTokenRepository>(IRefreshTokenRepository);
        mapper          = new RefreshTokenMapper();
    });

    describe('main', () =>
    {
        test('RawSQLRefreshTokensQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an refreshTokens founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLRefreshTokensQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});