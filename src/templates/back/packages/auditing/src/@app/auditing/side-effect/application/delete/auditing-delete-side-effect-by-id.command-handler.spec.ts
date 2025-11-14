import {
    AuditingDeleteSideEffectByIdCommand,
    auditingMockSideEffectData,
} from '@app/auditing/side-effect';
import { AuditingDeleteSideEffectByIdCommandHandler } from '@app/auditing/side-effect/application/delete/auditing-delete-side-effect-by-id.command-handler';
import { AuditingDeleteSideEffectByIdService } from '@app/auditing/side-effect/application/delete/auditing-delete-side-effect-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteSideEffectByIdCommandHandler', () => {
    let commandHandler: AuditingDeleteSideEffectByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingDeleteSideEffectByIdCommandHandler,
                {
                    provide: AuditingDeleteSideEffectByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<AuditingDeleteSideEffectByIdCommandHandler>(
            AuditingDeleteSideEffectByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('AuditingDeleteSideEffectByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AuditingDeleteSideEffectByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new AuditingDeleteSideEffectByIdCommand(
                        auditingMockSideEffectData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
