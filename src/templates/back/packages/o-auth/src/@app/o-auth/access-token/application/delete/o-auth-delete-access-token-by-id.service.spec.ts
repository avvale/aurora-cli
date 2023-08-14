/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token/infrastructure/mock/o-auth-mock-access-token.data';
import { OAuthDeleteAccessTokenByIdService } from './o-auth-delete-access-token-by-id.service';
import { OAuthAccessTokenId } from '../../domain/value-objects';
import { OAuthIAccessTokenRepository } from '../../domain/o-auth-access-token.repository';
import { OAuthMockAccessTokenRepository } from '../../infrastructure/mock/o-auth-mock-access-token.repository';

describe('OAuthDeleteAccessTokenByIdService', () =>
{
    let service: OAuthDeleteAccessTokenByIdService;
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
                OAuthDeleteAccessTokenByIdService,
                OAuthMockAccessTokenRepository,
                {
                    provide : OAuthIAccessTokenRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthDeleteAccessTokenByIdService);
        repository = module.get(OAuthIAccessTokenRepository);
        mockRepository = module.get(OAuthMockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthDeleteAccessTokenByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete accessToken and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new OAuthAccessTokenId(oAuthMockAccessTokenData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
