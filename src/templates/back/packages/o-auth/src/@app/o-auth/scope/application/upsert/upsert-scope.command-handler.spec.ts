import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { scopes } from '@app/o-auth/scope/infrastructure/mock/mock-scope.data';
import { UpsertScopeCommandHandler } from './upsert-scope.command-handler';
import { UpsertScopeCommand } from './upsert-scope.command';
import { UpsertScopeService } from './upsert-scope.service';

describe('UpsertScopeCommandHandler', () =>
{
    let commandHandler: UpsertScopeCommandHandler;
    let service: UpsertScopeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertScopeCommandHandler,
                {
                    provide : UpsertScopeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertScopeCommandHandler>(UpsertScopeCommandHandler);
        service         = module.get<UpsertScopeService>(UpsertScopeService);
    });

    describe('main', () =>
    {
        test('UpsertScopeCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertScopeService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertScopeCommand(
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