import { OAuthIRefreshTokenRepository, OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token';
import { OAuthMinRefreshTokenService } from '@app/o-auth/refresh-token/application/min/o-auth-min-refresh-token.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMinRefreshTokenService', () =>
{
    let service: OAuthMinRefreshTokenService;
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
                OAuthMinRefreshTokenService,
                OAuthMockRefreshTokenRepository,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthMinRefreshTokenService);
        repository = module.get(OAuthIRefreshTokenRepository);
        mockRepository = module.get(OAuthMockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthMinRefreshTokenService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(repository, 'min').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.min(column))));
            expect(await service.main('id')).toBe(mockRepository.min('id'));
        });
    });
});
