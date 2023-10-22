import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteSideEffectsCommandHandler } from './auditing-delete-side-effects.command-handler';
import { AuditingDeleteSideEffectsCommand } from './auditing-delete-side-effects.command';
import { AuditingDeleteSideEffectsService } from './auditing-delete-side-effects.service';

describe('AuditingDeleteSideEffectsCommandHandler', () =>
{
    let commandHandler: AuditingDeleteSideEffectsCommandHandler;
    let service: AuditingDeleteSideEffectsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingDeleteSideEffectsCommandHandler,
                {
                    provide : AuditingDeleteSideEffectsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingDeleteSideEffectsCommandHandler>(AuditingDeleteSideEffectsCommandHandler);
        service = module.get<AuditingDeleteSideEffectsService>(AuditingDeleteSideEffectsService);
    });

    describe('main', () =>
    {
        test('AuditingDeleteSideEffectsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AuditingDeleteSideEffectsCommand(),
            )).toBe(undefined);
        });
    });
});
