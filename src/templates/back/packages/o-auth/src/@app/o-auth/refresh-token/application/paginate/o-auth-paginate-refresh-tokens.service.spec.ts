import {
    OAuthIRefreshTokenRepository,
    OAuthMockRefreshTokenRepository,
} from '@app/o-auth/refresh-token';
import { OAuthPaginateRefreshTokensService } from '@app/o-auth/refresh-token/application/paginate/o-auth-paginate-refresh-tokens.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateRefreshTokensService', () => {
    let service: OAuthPaginateRefreshTokensService;
    let repository: OAuthIRefreshTokenRepository;
    let mockRepository: OAuthMockRefreshTokenRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthPaginateRefreshTokensService,
                OAuthMockRefreshTokenRepository,
                {
                    provide: OAuthIRefreshTokenRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthPaginateRefreshTokensService);
        repository = module.get(OAuthIRefreshTokenRepository);
        mockRepository = module.get(OAuthMockRefreshTokenRepository);
    });

    describe('main', () => {
        test('OAuthPaginateRefreshTokensService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should paginate refreshTokens', async () => {
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
