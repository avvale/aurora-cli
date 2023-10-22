/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { auditingMockSideEffectData } from '@app/auditing/side-effect/infrastructure/mock/auditing-mock-side-effect.data';
import { AuditingCreateSideEffectsCommandHandler } from './auditing-create-side-effects.command-handler';
import { AuditingCreateSideEffectsCommand } from './auditing-create-side-effects.command';
import { AuditingCreateSideEffectsService } from './auditing-create-side-effects.service';

describe('auditingCreateSideEffectsCommandHandler', () =>
{
    let commandHandler: AuditingCreateSideEffectsCommandHandler;
    let service: AuditingCreateSideEffectsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCreateSideEffectsCommandHandler,
                {
                    provide : AuditingCreateSideEffectsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingCreateSideEffectsCommandHandler>(AuditingCreateSideEffectsCommandHandler);
        service = module.get<AuditingCreateSideEffectsService>(AuditingCreateSideEffectsService);
    });

    describe('main', () =>
    {
        test('AuditingCreateSideEffectsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AuditingMockSideEffectData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AuditingCreateSideEffectsCommand(
                    auditingMockSideEffectData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
