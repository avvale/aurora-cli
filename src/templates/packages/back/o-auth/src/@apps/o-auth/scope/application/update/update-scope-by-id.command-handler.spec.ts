import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';
import { UpdateScopeByIdCommandHandler } from './update-scope-by-id.command-handler';
import { UpdateScopeByIdCommand } from './update-scope-by-id.command';
import { UpdateScopeByIdService } from './update-scope-by-id.service';

describe('UpdateScopeByIdCommandHandler', () =>
{
    let commandHandler: UpdateScopeByIdCommandHandler;
    let service: UpdateScopeByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateScopeByIdCommandHandler,
                {
                    provide : UpdateScopeByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateScopeByIdCommandHandler>(UpdateScopeByIdCommandHandler);
        service         = module.get<UpdateScopeByIdService>(UpdateScopeByIdService);
    });

    describe('main', () =>
    {
        test('UpdateScopeByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an scope created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateScopeByIdCommand(
                    {
                        id: scopes[0].id,
                        code: scopes[0].code,
                        name: scopes[0].name,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});