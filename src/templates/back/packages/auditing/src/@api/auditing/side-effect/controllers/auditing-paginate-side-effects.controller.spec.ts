import { AuditingPaginateSideEffectsController, AuditingPaginateSideEffectsHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingPaginateSideEffectsController', () =>
{
    let controller: AuditingPaginateSideEffectsController;
    let handler: AuditingPaginateSideEffectsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingPaginateSideEffectsController,
            ],
            providers: [
                {
                    provide : AuditingPaginateSideEffectsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingPaginateSideEffectsController>(AuditingPaginateSideEffectsController);
        handler = module.get<AuditingPaginateSideEffectsHandler>(AuditingPaginateSideEffectsHandler);
    });

    describe('main', () =>
    {
        test('AuditingPaginateSideEffectsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a auditingMockSideEffectData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : auditingMockSideEffectData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : auditingMockSideEffectData,
            });
        });
    });
});
