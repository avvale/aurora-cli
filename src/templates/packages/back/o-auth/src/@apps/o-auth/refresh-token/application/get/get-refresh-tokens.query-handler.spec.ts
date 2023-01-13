import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetRefreshTokensQueryHandler } from './get-refresh-tokens.query-handler';
import { MockRefreshTokenRepository } from '@app/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.repository';
import { IRefreshTokenRepository } from '@app/o-auth/refresh-token/domain/refresh-token.repository';
import { RefreshTokenMapper } from '@app/o-auth/refresh-token/domain/refresh-token.mapper';
import { GetRefreshTokensQuery } from './get-refresh-tokens.query';
import { GetRefreshTokensService } from './get-refresh-tokens.service';

describe('GetRefreshTokensQueryHandler', () =>
{
    let queryHandler: GetRefreshTokensQueryHandler;
    let service: GetRefreshTokensService;
    let repository: MockRefreshTokenRepository;
    let mapper: RefreshTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetRefreshTokensQueryHandler,
                {
                    provide : IRefreshTokenRepository,
                    useClass: MockRefreshTokenRepository,
                },
                {
                    provide : GetRefreshTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<GetRefreshTokensQueryHandler>(GetRefreshTokensQueryHandler);
        service         = module.get<GetRefreshTokensService>(GetRefreshTokensService);
        repository      = <MockRefreshTokenRepository>module.get<IRefreshTokenRepository>(IRefreshTokenRepository);
        mapper          = new RefreshTokenMapper();
    });

    describe('main', () =>
    {
        test('GetRefreshTokensQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an refreshTokens founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetRefreshTokensQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});