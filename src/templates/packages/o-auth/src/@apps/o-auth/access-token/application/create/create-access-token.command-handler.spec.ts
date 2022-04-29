import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { accessTokens } from '../../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { CreateAccessTokenCommandHandler } from './create-access-token.command-handler';
import { CreateAccessTokenCommand } from './create-access-token.command';
import { CreateAccessTokenService } from './create-access-token.service';

describe('CreateAccessTokenCommandHandler', () =>
{
    let commandHandler: CreateAccessTokenCommandHandler;
    let service: CreateAccessTokenService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAccessTokenCommandHandler,
                {
                    provide : CreateAccessTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateAccessTokenCommandHandler>(CreateAccessTokenCommandHandler);
        service         = module.get<CreateAccessTokenService>(CreateAccessTokenService);
    });

    describe('main', () =>
    {
        test('CreateAccessTokenCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAccessTokenService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAccessTokenCommand(
                    {
                        id: accessTokens[0].id,
                        clientId: accessTokens[0].clientId,
                        accountId: accessTokens[0].accountId,
                        token: accessTokens[0].token,
                        name: accessTokens[0].name,
                        isRevoked: accessTokens[0].isRevoked,
                        expiresAt: accessTokens[0].expiresAt,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});