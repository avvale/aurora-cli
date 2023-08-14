import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token/infrastructure/mock/o-auth-mock-refresh-token.data';
import { OAuthFindRefreshTokenByIdService } from './o-auth-find-refresh-token-by-id.service';
import { OAuthRefreshTokenId } from '../../domain/value-objects';
import { OAuthIRefreshTokenRepository } from '../../domain/o-auth-refresh-token.repository';
import { OAuthMockRefreshTokenRepository } from '../../infrastructure/mock/o-auth-mock-refresh-token.repository';

describe('OAuthFindRefreshTokenByIdService', () =>
{
    let service: OAuthFindRefreshTokenByIdService;
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
                OAuthFindRefreshTokenByIdService,
                OAuthMockRefreshTokenRepository,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthFindRefreshTokenByIdService);
        repository = module.get(OAuthIRefreshTokenRepository);
        mockRepository = module.get(OAuthMockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('FindRefreshTokenByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find refreshToken by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new OAuthRefreshTokenId(oAuthMockRefreshTokenData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
