/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';
import { CreateScopesCommandHandler } from './create-scopes.command-handler';
import { CreateScopesCommand } from './create-scopes.command';
import { CreateScopesService } from './create-scopes.service';

describe('CreateScopesCommandHandler', () =>
{
    let commandHandler: CreateScopesCommandHandler;
    let service: CreateScopesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateScopesCommandHandler,
                {
                    provide : CreateScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateScopesCommandHandler>(CreateScopesCommandHandler);
        service         = module.get<CreateScopesService>(CreateScopesService);
    });

    describe('main', () =>
    {
        test('CreateScopesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return scopes createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateScopesCommand(
                    scopes,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});