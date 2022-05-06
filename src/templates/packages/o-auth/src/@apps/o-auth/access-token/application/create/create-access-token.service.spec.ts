/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

// custom items
import { accessTokensToCreate as accessTokens } from '../../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { CreateAccessTokenService } from './create-access-token.service';
import {
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenScopes,
    AccessTokenAccountId,
    AccessTokenName,
    AccessTokenExpiredAccessToken,
} from '../../domain/value-objects';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { MockAccessTokenRepository } from '../../infrastructure/mock/mock-access-token.repository';

describe('CreateAccessTokenService', () =>

{
    let service: CreateAccessTokenService;
    let repository: IAccessTokenRepository;
    let mockRepository: MockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: '1234567890',
                }),
            ],
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateAccessTokenService,
                MockAccessTokenRepository,
                {
                    provide : IAccessTokenRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CreateAccessTokenService);
        repository      = module.get(IAccessTokenRepository);
        mockRepository  = module.get(MockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('CreateAccessTokenService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a accessToken and emit event', async () =>
        {
            expect(await service.main(
                {
                    id                : new AccessTokenId(accessTokens[0].id),
                    clientId          : new AccessTokenClientId(accessTokens[0].clientId),
                    scopes            : new AccessTokenScopes(accessTokens[0].scopes),
                    accountId         : new AccessTokenAccountId(accessTokens[0].accountId),
                    name              : new AccessTokenName(accessTokens[0].name),
                    expiredAccessToken: new AccessTokenExpiredAccessToken(accessTokens[0].expiredAccessToken),
                },
            )).toBe(undefined);
        });
    });
});