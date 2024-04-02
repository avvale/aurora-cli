import { OAuthIAccessTokenRepository, OAuthMockAccessTokenRepository } from '@app/o-auth/access-token';
import { OAuthMinAccessTokenService } from '@app/o-auth/access-token/application/min/o-auth-min-access-token.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMinAccessTokenService', () =>
{
    let service: OAuthMinAccessTokenService;
    let repository: OAuthIAccessTokenRepository;
    let mockRepository: OAuthMockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthMinAccessTokenService,
                OAuthMockAccessTokenRepository,
                {
                    provide : OAuthIAccessTokenRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthMinAccessTokenService);
        repository = module.get(OAuthIAccessTokenRepository);
        mockRepository = module.get(OAuthMockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthMinAccessTokenService should be defined', () =>
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
