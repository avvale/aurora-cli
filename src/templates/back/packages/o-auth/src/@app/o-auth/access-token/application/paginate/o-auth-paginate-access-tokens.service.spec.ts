import {
    OAuthIAccessTokenRepository,
    OAuthMockAccessTokenRepository,
} from '@app/o-auth/access-token';
import { OAuthPaginateAccessTokensService } from '@app/o-auth/access-token/application/paginate/o-auth-paginate-access-tokens.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateAccessTokensService', () => {
    let service: OAuthPaginateAccessTokensService;
    let repository: OAuthIAccessTokenRepository;
    let mockRepository: OAuthMockAccessTokenRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthPaginateAccessTokensService,
                OAuthMockAccessTokenRepository,
                {
                    provide: OAuthIAccessTokenRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthPaginateAccessTokensService);
        repository = module.get(OAuthIAccessTokenRepository);
        mockRepository = module.get(OAuthMockAccessTokenRepository);
    });

    describe('main', () => {
        test('OAuthPaginateAccessTokensService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should paginate accessTokens', async () => {
            jest.spyOn(repository, 'paginate').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: mockRepository.collectionSource.slice(0, 10)
                                .length,
                            count: mockRepository.collectionSource.slice(0, 10)
                                .length,
                            rows: mockRepository.collectionSource.slice(0, 10),
                        }),
                    ),
            );
            expect(
                await service.main({
                    offset: 0,
                    limit: 10,
                }),
            ).toStrictEqual({
                total: mockRepository.collectionSource.slice(0, 10).length,
                count: mockRepository.collectionSource.slice(0, 10).length,
                rows: mockRepository.collectionSource.slice(0, 10),
            });
        });
    });
});
