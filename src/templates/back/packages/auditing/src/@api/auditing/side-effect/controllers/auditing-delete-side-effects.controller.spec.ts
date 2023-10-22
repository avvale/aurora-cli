import { AuditingDeleteSideEffectsController, AuditingDeleteSideEffectsHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteSideEffectsController', () =>
{
    let controller: AuditingDeleteSideEffectsController;
    let handler: AuditingDeleteSideEffectsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingDeleteSideEffectsController,
            ],
            providers: [
                {
                    provide : AuditingDeleteSideEffectsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingDeleteSideEffectsController>(AuditingDeleteSideEffectsController);
        handler = module.get<AuditingDeleteSideEffectsHandler>(AuditingDeleteSideEffectsHandler);
    });

    describe('main', () =>
    {
        test('AuditingDeleteSideEffectsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an auditingMockSideEffectData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockSideEffectData)));
            expect(await controller.main()).toBe(auditingMockSideEffectData);
        });
    });
});
