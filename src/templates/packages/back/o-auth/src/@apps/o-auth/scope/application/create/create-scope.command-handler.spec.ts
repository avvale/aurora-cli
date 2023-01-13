import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';
import { CreateScopeCommandHandler } from './create-scope.command-handler';
import { CreateScopeCommand } from './create-scope.command';
import { CreateScopeService } from './create-scope.service';

describe('CreateScopeCommandHandler', () =>
{
    let commandHandler: CreateScopeCommandHandler;
    let service: CreateScopeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateScopeCommandHandler,
                {
                    provide : CreateScopeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateScopeCommandHandler>(CreateScopeCommandHandler);
        service         = module.get<CreateScopeService>(CreateScopeService);
    });

    describe('main', () =>
    {
        test('CreateScopeCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateScopeService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateScopeCommand(
                    {
                        id: scopes[0].id,
                        code: scopes[0].code,
                        name: scopes[0].name,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});