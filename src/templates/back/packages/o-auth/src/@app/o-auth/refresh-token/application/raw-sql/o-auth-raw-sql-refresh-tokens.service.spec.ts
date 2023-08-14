import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthRawSQLRefreshTokensService } from './o-auth-raw-sql-refresh-tokens.service';
import { OAuthIRefreshTokenRepository } from '../../domain/o-auth-refresh-token.repository';
import { OAuthMockRefreshTokenRepository } from '../../infrastructure/mock/o-auth-mock-refresh-token.repository';

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
