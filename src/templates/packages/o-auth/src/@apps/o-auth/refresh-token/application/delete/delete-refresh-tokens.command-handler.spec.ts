import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteRefreshTokensCommandHandler } from './delete-refresh-tokens.command-handler';
import { DeleteRefreshTokensCommand } from './delete-refresh-tokens.command';
import { DeleteRefreshTokensService } from './delete-refresh-tokens.service';

describe('DeleteRefreshTokensCommandHandler', () =>
{
    let commandHandler: DeleteRefreshTokensCommandHandler;
    let service: DeleteRefreshTokensService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteRefreshTokensCommandHandler,
                {
                    provide : DeleteRefreshTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<DeleteRefreshTokensCommandHandler>(DeleteRefreshTokensCommandHandler);
        service         = module.get<DeleteRefreshTokensService>(DeleteRefreshTokensService);
    });

    describe('main', () =>
    {
        test('DeleteRefreshTokensCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteRefreshTokensCommand(),
            )).toBe(undefined);
        });
    });
});