/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token/infrastructure/mock/o-auth-mock-refresh-token.data';
import { OAuthDeleteRefreshTokenByIdService } from './o-auth-delete-refresh-token-by-id.service';
import { OAuthRefreshTokenId } from '../../domain/value-objects';
import { OAuthIRefreshTokenRepository } from '../../domain/o-auth-refresh-token.repository';
import { OAuthMockRefreshTokenRepository } from '../../infrastructure/mock/o-auth-mock-refresh-token.repository';

describe('OAuthDeleteRefreshTokenByIdService', () =>
{
    let service: OAuthDeleteRefreshTokenByIdService;
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
                OAuthDeleteRefreshTokenByIdService,
                OAuthMockRefreshTokenRepository,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthDeleteRefreshTokenByIdService);
        repository = module.get(OAuthIRefreshTokenRepository);
        mockRepository = module.get(OAuthMockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthDeleteRefreshTokenByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete refreshToken and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new OAuthRefreshTokenId(oAuthMockRefreshTokenData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
