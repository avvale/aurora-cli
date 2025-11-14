import { AuditingDeleteSideEffectsCommand } from '@app/auditing/side-effect';
import { AuditingDeleteSideEffectsCommandHandler } from '@app/auditing/side-effect/application/delete/auditing-delete-side-effects.command-handler';
import { AuditingDeleteSideEffectsService } from '@app/auditing/side-effect/application/delete/auditing-delete-side-effects.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteSideEffectsCommandHandler', () => {
    let commandHandler: AuditingDeleteSideEffectsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingDeleteSideEffectsCommandHandler,
                {
                    provide: AuditingDeleteSideEffectsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<AuditingDeleteSideEffectsCommandHandler>(
            AuditingDeleteSideEffectsCommandHandler,
        );
    });

    describe('main', () => {
        test('AuditingDeleteSideEffectsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(
                    new AuditingDeleteSideEffectsCommand(),
                ),
            ).toBe(undefined);
        });
    });
});
