import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';
import { UpdateScopesCommandHandler } from './update-scopes.command-handler';
import { UpdateScopesCommand } from './update-scopes.command';
import { UpdateScopesService } from './update-scopes.service';

describe('UpdateScopesCommandHandler', () =>
{
    let commandHandler: UpdateScopesCommandHandler;
    let service: UpdateScopesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateScopesCommandHandler,
                {
                    provide : UpdateScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateScopesCommandHandler>(UpdateScopesCommandHandler);
        service         = module.get<UpdateScopesService>(UpdateScopesService);
    });

    describe('main', () =>
    {
        test('UpdateScopesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an scopes updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateScopesCommand(
                    {
                        id: scopes[0].id,
                        code: scopes[0].code,
                        name: scopes[0].name,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});