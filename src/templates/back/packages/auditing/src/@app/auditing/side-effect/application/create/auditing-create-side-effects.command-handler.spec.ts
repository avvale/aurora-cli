import {
    AuditingCreateSideEffectsCommand,
    auditingMockSideEffectData,
} from '@app/auditing/side-effect';
import { AuditingCreateSideEffectsCommandHandler } from '@app/auditing/side-effect/application/create/auditing-create-side-effects.command-handler';
import { AuditingCreateSideEffectsService } from '@app/auditing/side-effect/application/create/auditing-create-side-effects.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('auditingCreateSideEffectsCommandHandler', () => {
    let commandHandler: AuditingCreateSideEffectsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCreateSideEffectsCommandHandler,
                {
                    provide: AuditingCreateSideEffectsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<AuditingCreateSideEffectsCommandHandler>(
            AuditingCreateSideEffectsCommandHandler,
        );
    });

    describe('main', () => {
        test('AuditingCreateSideEffectsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return AuditingMockSideEffectData created', async () => {
            expect(
                await commandHandler.execute(
                    new AuditingCreateSideEffectsCommand(
                        auditingMockSideEffectData,
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
