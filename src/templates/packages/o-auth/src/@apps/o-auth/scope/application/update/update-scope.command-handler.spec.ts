import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { scopes } from '../../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';
import { UpdateScopeCommandHandler } from './update-scope.command-handler';
import { UpdateScopeCommand } from './update-scope.command';
import { UpdateScopeService } from './update-scope.service';

describe('UpdateScopeCommandHandler', () =>
{
    let commandHandler: UpdateScopeCommandHandler;
    let service: UpdateScopeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateScopeCommandHandler,
                {
                    provide : UpdateScopeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateScopeCommandHandler>(UpdateScopeCommandHandler);
        service         = module.get<UpdateScopeService>(UpdateScopeService);
    });

    describe('main', () =>
    {
        test('UpdateScopeCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an scope created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateScopeCommand(
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