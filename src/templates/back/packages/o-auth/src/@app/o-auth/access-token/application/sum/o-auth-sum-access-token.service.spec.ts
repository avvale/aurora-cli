import { OAuthIAccessTokenRepository, OAuthMockAccessTokenRepository } from '@app/o-auth/access-token';
import { OAuthSumAccessTokenService } from '@app/o-auth/access-token/application/sum/o-auth-sum-access-token.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthSumAccessTokenService', () =>
{
    let service: OAuthSumAccessTokenService;
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
                OAuthSumAccessTokenService,
                OAuthMockAccessTokenRepository,
                {
                    provide : OAuthIAccessTokenRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthSumAccessTokenService);
        repository = module.get(OAuthIAccessTokenRepository);
        mockRepository = module.get(OAuthMockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthSumAccessTokenService should be defined', () =>
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
