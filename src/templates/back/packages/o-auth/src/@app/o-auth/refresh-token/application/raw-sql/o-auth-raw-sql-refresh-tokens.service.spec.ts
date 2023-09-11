import { OAuthIRefreshTokenRepository, OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token';
import { OAuthRawSQLRefreshTokensService } from '@app/o-auth/refresh-token/application/raw-sql/o-auth-raw-sql-refresh-tokens.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthRawSQLRefreshTokensService ', () =>
{
    let service: OAuthRawSQLRefreshTokensService ;
    let repository: OAuthIRefreshTokenRepository;
    let mockRepository: OAuthMockRefreshTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthRawSQLRefreshTokensService ,
                OAuthMockRefreshTokenRepository,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(OAuthRawSQLRefreshTokensService );
        repository      = module.get(OAuthIRefreshTokenRepository);
        mockRepository  = module.get(OAuthMockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('RawSQLRefreshTokensService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get refreshTokens', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
