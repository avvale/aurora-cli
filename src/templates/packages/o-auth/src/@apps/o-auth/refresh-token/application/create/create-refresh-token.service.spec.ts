/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { refreshTokens } from '../../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { CreateRefreshTokenService } from './create-refresh-token.service';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt,
} from '../../domain/value-objects';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';
import { MockRefreshTokenRepository } from '../../infrastructure/mock/mock-refresh-token.repository';

describe('CreateRefreshTokenService', () =>

{
    let service: CreateRefreshTokenService;
    let repository: IRefreshTokenRepository;
    let mockRepository: MockRefreshTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateRefreshTokenService,
                MockRefreshTokenRepository,
                {
                    provide : IRefreshTokenRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        }).compile();

        service         = module.get(CreateRefreshTokenService);
        repository      = module.get(IRefreshTokenRepository);
        mockRepository  = module.get(MockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('CreateRefreshTokenService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a refreshToken and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new RefreshTokenId(refreshTokens[0].id),
                    accessTokenId: new RefreshTokenAccessTokenId(refreshTokens[0].accessTokenId),
                    token: new RefreshTokenToken(refreshTokens[0].token),
                    isRevoked: new RefreshTokenIsRevoked(refreshTokens[0].isRevoked),
                    expiresAt: new RefreshTokenExpiresAt(refreshTokens[0].expiresAt),
                },
            )).toBe(undefined);
        });
    });
});