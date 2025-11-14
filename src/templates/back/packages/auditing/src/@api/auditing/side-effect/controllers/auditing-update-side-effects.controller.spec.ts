import {
    AuditingUpdateSideEffectsController,
    AuditingUpdateSideEffectsHandler,
} from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateSideEffectsController', () => {
    let controller: AuditingUpdateSideEffectsController;
    let handler: AuditingUpdateSideEffectsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [AuditingUpdateSideEffectsController],
            providers: [
                {
                    provide: AuditingUpdateSideEffectsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<AuditingUpdateSideEffectsController>(
            AuditingUpdateSideEffectsController,
        );
        handler = module.get<AuditingUpdateSideEffectsHandler>(
            AuditingUpdateSideEffectsHandler,
        );
    });

    describe('main', () => {
        test('AuditingUpdateSideEffectsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a sideEffects updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockSideEffectData[0]),
                    ),
            );
            expect(await controller.main(auditingMockSideEffectData[0])).toBe(
                auditingMockSideEffectData[0],
            );
        });
    });
});
