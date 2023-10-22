import { AuditingUpsertSideEffectController, AuditingUpsertSideEffectHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpsertSideEffectController', () =>
{
    let controller: AuditingUpsertSideEffectController;
    let handler: AuditingUpsertSideEffectHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingUpsertSideEffectController,
            ],
            providers: [
                {
                    provide : AuditingUpsertSideEffectHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingUpsertSideEffectController>(AuditingUpsertSideEffectController);
        handler = module.get<AuditingUpsertSideEffectHandler>(AuditingUpsertSideEffectHandler);
    });

    describe('main', () =>
    {
        test('AuditingUpsertSideEffectController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an sideEffect upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockSideEffectData[0])));
            expect(await controller.main(auditingMockSideEffectData[0])).toBe(auditingMockSideEffectData[0]);
        });
    });
});
