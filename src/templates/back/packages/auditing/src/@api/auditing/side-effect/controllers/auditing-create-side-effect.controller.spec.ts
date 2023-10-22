import { AuditingCreateSideEffectController, AuditingCreateSideEffectHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateSideEffectController', () =>
{
    let controller: AuditingCreateSideEffectController;
    let handler: AuditingCreateSideEffectHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingCreateSideEffectController,
            ],
            providers: [
                {
                    provide : AuditingCreateSideEffectHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingCreateSideEffectController>(AuditingCreateSideEffectController);
        handler = module.get<AuditingCreateSideEffectHandler>(AuditingCreateSideEffectHandler);
    });

    describe('main', () =>
    {
        test('AuditingCreateSideEffectController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an sideEffect created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockSideEffectData[0])));
            expect(
                await controller.main(
                    auditingMockSideEffectData[0],
                ),
            )
                .toBe(auditingMockSideEffectData[0]);
        });
    });
});
