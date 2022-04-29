/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { accessTokens } from '../../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { UpdateAccessTokenService } from './update-access-token.service';
import {
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenDeletedAt,
} from '../../domain/value-objects';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { MockAccessTokenRepository } from '../../infrastructure/mock/mock-access-token.repository';

describe('UpdateAccessTokenService', () =>
{
    let service: UpdateAccessTokenService;
    let repository: IAccessTokenRepository;
    let mockRepository: MockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAccessTokenService,
                MockAccessTokenRepository,
                {
                    provide : IAccessTokenRepository,
                    useValue: {
                        update: () => { /**/ },
                    },
                },
            ],
        }).compile();

        service         = module.get(UpdateAccessTokenService);
        repository      = module.get(IAccessTokenRepository);
        mockRepository  = module.get(MockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('UpdateAccessTokenService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a accessToken and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new AccessTokenId(accessTokens[0].id),
                    clientId: new AccessTokenClientId(accessTokens[0].clientId),
                    accountId: new AccessTokenAccountId(accessTokens[0].accountId),
                    token: new AccessTokenToken(accessTokens[0].token),
                    name: new AccessTokenName(accessTokens[0].name),
                    isRevoked: new AccessTokenIsRevoked(accessTokens[0].isRevoked),
                    expiresAt: new AccessTokenExpiresAt(accessTokens[0].expiresAt),
                }
            )).toBe(undefined);
        });
    });
});