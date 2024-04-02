import { OAuthIAccessTokenRepository, OAuthMockAccessTokenRepository } from '@app/o-auth/access-token';
import { OAuthCountAccessTokenService } from '@app/o-auth/access-token/application/count/o-auth-count-access-token.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCountAccessTokenService', () =>
{
    let service: OAuthCountAccessTokenService;
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
                OAuthCountAccessTokenService,
                OAuthMockAccessTokenRepository,
                {
                    provide : OAuthIAccessTokenRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthCountAccessTokenService);
        repository = module.get(OAuthIAccessTokenRepository);
        mockRepository = module.get(OAuthMockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthCountAccessTokenService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () =>
        {
            jest.spyOn(repository, 'count').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource.length)));
            expect(await service.main()).toBe(mockRepository.collectionSource.length);
        });
    });
});
