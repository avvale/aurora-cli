import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAccessTokensCommandHandler } from './delete-access-tokens.command-handler';
import { DeleteAccessTokensCommand } from './delete-access-tokens.command';
import { DeleteAccessTokensService } from './delete-access-tokens.service';

describe('DeleteAccessTokensCommandHandler', () =>
{
    let commandHandler: DeleteAccessTokensCommandHandler;
    let service: DeleteAccessTokensService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAccessTokensCommandHandler,
                {
                    provide : DeleteAccessTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<DeleteAccessTokensCommandHandler>(DeleteAccessTokensCommandHandler);
        service         = module.get<DeleteAccessTokensService>(DeleteAccessTokensService);
    });

    describe('main', () =>
    {
        test('DeleteAccessTokensCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAccessTokensCommand(),
            )).toBe(undefined);
        });
    });
});