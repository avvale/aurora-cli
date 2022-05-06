import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindRefreshTokenQueryHandler } from './find-refresh-token.query-handler';
import { MockRefreshTokenRepository } from '@apps/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.repository';
import { IRefreshTokenRepository } from '@apps/o-auth/refresh-token/domain/refresh-token.repository';
import { RefreshTokenMapper } from '@apps/o-auth/refresh-token/domain/refresh-token.mapper';
import { FindRefreshTokenQuery } from './find-refresh-token.query';
import { FindRefreshTokenService } from './find-refresh-token.service';

describe('FindRefreshTokenQueryHandler', () =>
{
    let queryHandler: FindRefreshTokenQueryHandler;
    let service: FindRefreshTokenService;
    let repository: MockRefreshTokenRepository;
    let mapper: RefreshTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindRefreshTokenQueryHandler,
                {
                    provide : IRefreshTokenRepository,
                    useClass: MockRefreshTokenRepository,
                },
                {
                    provide : FindRefreshTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindRefreshTokenQueryHandler>(FindRefreshTokenQueryHandler);
        service         = module.get<FindRefreshTokenService>(FindRefreshTokenService);
        repository      = <MockRefreshTokenRepository>module.get<IRefreshTokenRepository>(IRefreshTokenRepository);
        mapper          = new RefreshTokenMapper();
    });

    describe('main', () =>
    {
        test('FindRefreshTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an refreshToken founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindRefreshTokenQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});