import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthGetRefreshTokensService } from './o-auth-get-refresh-tokens.service';
import { OAuthIRefreshTokenRepository } from '../../domain/o-auth-refresh-token.repository';
import { OAuthMockRefreshTokenRepository } from '../../infrastructure/mock/o-auth-mock-refresh-token.repository';

describe('OAuthGetRefreshTokensService', () =>
{
    let service: OAuthGetRefreshTokensService;
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
                OAuthGetRefreshTokensService,
                OAuthMockRefreshTokenRepository,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthGetRefreshTokensService);
        repository = module.get(OAuthIRefreshTokenRepository);
        mockRepository = module.get(OAuthMockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('GetRefreshTokensService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get refreshTokens', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
