import { AuditingFindSideEffectController, AuditingFindSideEffectHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindSideEffectController', () =>
{
    let controller: AuditingFindSideEffectController;
    let handler: AuditingFindSideEffectHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingFindSideEffectController,
            ],
            providers: [
                {
                    provide : AuditingFindSideEffectHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingFindSideEffectController>(AuditingFindSideEffectController);
        handler = module.get<AuditingFindSideEffectHandler>(AuditingFindSideEffectHandler);
    });

    describe('main', () =>
    {
        test('AuditingFindSideEffectController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a sideEffect', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockSideEffectData[0])));
            expect(await controller.main()).toBe(auditingMockSideEffectData[0]);
        });
    });
});
