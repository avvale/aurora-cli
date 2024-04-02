import { OAuthIRefreshTokenRepository, OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token';
import { OAuthMaxRefreshTokenService } from '@app/o-auth/refresh-token/application/max/o-auth-max-refresh-token.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMaxRefreshTokenService', () =>
{
    let service: OAuthMaxRefreshTokenService;
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
                OAuthMaxRefreshTokenService,
                OAuthMockRefreshTokenRepository,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthMaxRefreshTokenService);
        repository = module.get(OAuthIRefreshTokenRepository);
        mockRepository = module.get(OAuthMockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthMaxRefreshTokenService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(repository, 'max').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.max(column))));
            expect(await service.main('id')).toBe(mockRepository.max('id'));
        });
    });
});
