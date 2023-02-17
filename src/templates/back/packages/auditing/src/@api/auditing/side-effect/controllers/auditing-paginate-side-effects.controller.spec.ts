/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingPaginateSideEffectsController } from './auditing-paginate-side-effects.controller';
import { AuditingPaginateSideEffectsHandler } from '../handlers/auditing-paginate-side-effects.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

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

        test('should return a sideEffects', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : sideEffects,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : sideEffects,
            });
        });
    });
});