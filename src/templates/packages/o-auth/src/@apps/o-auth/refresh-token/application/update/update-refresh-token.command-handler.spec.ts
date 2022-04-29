import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { refreshTokens } from '../../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { UpdateRefreshTokenCommandHandler } from './update-refresh-token.command-handler';
import { UpdateRefreshTokenCommand } from './update-refresh-token.command';
import { UpdateRefreshTokenService } from './update-refresh-token.service';

describe('UpdateRefreshTokenCommandHandler', () =>
{
    let commandHandler: UpdateRefreshTokenCommandHandler;
    let service: UpdateRefreshTokenService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateRefreshTokenCommandHandler,
                {
                    provide : UpdateRefreshTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<UpdateRefreshTokenCommandHandler>(UpdateRefreshTokenCommandHandler);
        service         = module.get<UpdateRefreshTokenService>(UpdateRefreshTokenService);
    });

    describe('main', () =>
    {
        test('UpdateRefreshTokenCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an refreshToken created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateRefreshTokenCommand(
                    {
                        id: refreshTokens[0].id,
                        accessTokenId: refreshTokens[0].accessTokenId,
                        token: refreshTokens[0].token,
                        isRevoked: refreshTokens[0].isRevoked,
                        expiresAt: refreshTokens[0].expiresAt,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});