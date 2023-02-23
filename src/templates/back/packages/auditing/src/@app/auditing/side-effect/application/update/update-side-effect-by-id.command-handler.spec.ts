import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';
import { UpdateSideEffectByIdCommandHandler } from './update-side-effect-by-id.command-handler';
import { UpdateSideEffectByIdCommand } from './update-side-effect-by-id.command';
import { UpdateSideEffectByIdService } from './update-side-effect-by-id.service';

describe('UpdateSideEffectByIdCommandHandler', () =>
{
    let commandHandler: UpdateSideEffectByIdCommandHandler;
    let service: UpdateSideEffectByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateSideEffectByIdCommandHandler,
                {
                    provide : UpdateSideEffectByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateSideEffectByIdCommandHandler>(UpdateSideEffectByIdCommandHandler);
        service         = module.get<UpdateSideEffectByIdService>(UpdateSideEffectByIdService);
    });

    describe('main', () =>
    {
        test('UpdateSideEffectByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an sideEffect created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateSideEffectByIdCommand(
                    {
                        id: sideEffects[0].id,
                        tags: sideEffects[0].tags,
                        modelPath: sideEffects[0].modelPath,
                        modelName: sideEffects[0].modelName,
                        operationId: sideEffects[0].operationId,
                        operationSort: sideEffects[0].operationSort,
                        accountId: sideEffects[0].accountId,
                        email: sideEffects[0].email,
                        event: sideEffects[0].event,
                        auditableId: sideEffects[0].auditableId,
                        oldValue: sideEffects[0].oldValue,
                        newValue: sideEffects[0].newValue,
                        ip: sideEffects[0].ip,
                        method: sideEffects[0].method,
                        baseUrl: sideEffects[0].baseUrl,
                        params: sideEffects[0].params,
                        query: sideEffects[0].query,
                        body: sideEffects[0].body,
                        userAgent: sideEffects[0].userAgent,
                        isRollback: sideEffects[0].isRollback,
                        rollbackSideEffectId: sideEffects[0].rollbackSideEffectId,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});