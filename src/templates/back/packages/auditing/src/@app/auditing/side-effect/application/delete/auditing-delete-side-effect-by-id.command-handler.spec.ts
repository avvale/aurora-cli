import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteSideEffectByIdCommandHandler } from './auditing-delete-side-effect-by-id.command-handler';
import { auditingMockSideEffectData } from '@app/auditing/side-effect/infrastructure/mock/auditing-mock-side-effect.data';
import { AuditingDeleteSideEffectByIdCommand } from './auditing-delete-side-effect-by-id.command';
import { AuditingDeleteSideEffectByIdService } from './auditing-delete-side-effect-by-id.service';

describe('AuditingDeleteSideEffectByIdCommandHandler', () =>
{
    let commandHandler: AuditingDeleteSideEffectByIdCommandHandler;
    let service: AuditingDeleteSideEffectByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingDeleteSideEffectByIdCommandHandler,
                {
                    provide : AuditingDeleteSideEffectByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingDeleteSideEffectByIdCommandHandler>(AuditingDeleteSideEffectByIdCommandHandler);
        service = module.get<AuditingDeleteSideEffectByIdService>(AuditingDeleteSideEffectByIdService);
    });

    describe('main', () =>
    {
        test('AuditingDeleteSideEffectByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AuditingDeleteSideEffectByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AuditingDeleteSideEffectByIdCommand(
                    auditingMockSideEffectData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
