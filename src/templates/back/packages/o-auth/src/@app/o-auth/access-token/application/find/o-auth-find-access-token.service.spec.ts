import {
    OAuthIAccessTokenRepository,
    OAuthMockAccessTokenRepository,
} from '@app/o-auth/access-token';
import { OAuthFindAccessTokenService } from '@app/o-auth/access-token/application/find/o-auth-find-access-token.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindAccessTokenService', () => {
    let service: OAuthFindAccessTokenService;
    let repository: OAuthIAccessTokenRepository;
    let mockRepository: OAuthMockAccessTokenRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthFindAccessTokenService,
                OAuthMockAccessTokenRepository,
                {
                    provide: OAuthIAccessTokenRepository,
                    useValue: {
                        find: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthFindAccessTokenService);
        repository = module.get(OAuthIAccessTokenRepository);
        mockRepository = module.get(OAuthMockAccessTokenRepository);
    });

    describe('main', () => {
        test('OAuthFindAccessTokenService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find accessToken', async () => {
            jest.spyOn(repository, 'find').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource[0],
            );
        });
    });
});
