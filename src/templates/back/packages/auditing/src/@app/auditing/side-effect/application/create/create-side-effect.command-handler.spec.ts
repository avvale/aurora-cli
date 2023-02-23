import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';
import { CreateSideEffectCommandHandler } from './create-side-effect.command-handler';
import { CreateSideEffectCommand } from './create-side-effect.command';
import { CreateSideEffectService } from './create-side-effect.service';

describe('CreateSideEffectCommandHandler', () =>
{
    let commandHandler: CreateSideEffectCommandHandler;
    let service: CreateSideEffectService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSideEffectCommandHandler,
                {
                    provide : CreateSideEffectService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateSideEffectCommandHandler>(CreateSideEffectCommandHandler);
        service         = module.get<CreateSideEffectService>(CreateSideEffectService);
    });

    describe('main', () =>
    {
        test('CreateSideEffectCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateSideEffectService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateSideEffectCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});