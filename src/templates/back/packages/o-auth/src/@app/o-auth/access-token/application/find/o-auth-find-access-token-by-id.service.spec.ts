import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token/infrastructure/mock/o-auth-mock-access-token.data';
import { OAuthFindAccessTokenByIdService } from './o-auth-find-access-token-by-id.service';
import { OAuthAccessTokenId } from '../../domain/value-objects';
import { OAuthIAccessTokenRepository } from '../../domain/o-auth-access-token.repository';
import { OAuthMockAccessTokenRepository } from '../../infrastructure/mock/o-auth-mock-access-token.repository';

describe('OAuthFindAccessTokenByIdService', () =>
{
    let service: OAuthFindAccessTokenByIdService;
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
                OAuthFindAccessTokenByIdService,
                OAuthMockAccessTokenRepository,
                {
                    provide : OAuthIAccessTokenRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthFindAccessTokenByIdService);
        repository = module.get(OAuthIAccessTokenRepository);
        mockRepository = module.get(OAuthMockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('FindAccessTokenByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find accessToken by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new OAuthAccessTokenId(oAuthMockAccessTokenData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
