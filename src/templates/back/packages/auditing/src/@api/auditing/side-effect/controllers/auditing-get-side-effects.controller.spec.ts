import {
    AuditingGetSideEffectsController,
    AuditingGetSideEffectsHandler,
} from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingGetSideEffectsController', () => {
    let controller: AuditingGetSideEffectsController;
    let handler: AuditingGetSideEffectsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [AuditingGetSideEffectsController],
            providers: [
                {
                    provide: AuditingGetSideEffectsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<AuditingGetSideEffectsController>(
            AuditingGetSideEffectsController,
        );
        handler = module.get<AuditingGetSideEffectsHandler>(
            AuditingGetSideEffectsHandler,
        );
    });

    describe('main', () => {
        test('AuditingGetSideEffectsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a auditingMockSideEffectData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockSideEffectData),
                    ),
            );
            expect(await controller.main()).toBe(auditingMockSideEffectData);
        });
    });
});
