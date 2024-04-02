import { OAuthIRefreshTokenRepository, OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token';
import { OAuthSumRefreshTokenService } from '@app/o-auth/refresh-token/application/sum/o-auth-sum-refresh-token.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthSumRefreshTokenService', () =>
{
    let service: OAuthSumRefreshTokenService;
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
                OAuthSumRefreshTokenService,
                OAuthMockRefreshTokenRepository,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthSumRefreshTokenService);
        repository = module.get(OAuthIRefreshTokenRepository);
        mockRepository = module.get(OAuthMockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthSumRefreshTokenService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(repository, 'sum').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.sum(column))));
            expect(await service.main('id')).toBe(mockRepository.sum('id'));
        });
    });
});
