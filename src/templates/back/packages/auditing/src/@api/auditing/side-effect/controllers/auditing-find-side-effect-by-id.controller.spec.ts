import { AuditingFindSideEffectByIdController, AuditingFindSideEffectByIdHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindSideEffectByIdController', () =>
{
    let controller: AuditingFindSideEffectByIdController;
    let handler: AuditingFindSideEffectByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingFindSideEffectByIdController,
            ],
            providers: [
                {
                    provide : AuditingFindSideEffectByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingFindSideEffectByIdController>(AuditingFindSideEffectByIdController);
        handler = module.get<AuditingFindSideEffectByIdHandler>(AuditingFindSideEffectByIdHandler);
    });

    describe('main', () =>
    {
        test('AuditingFindSideEffectByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an sideEffect by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockSideEffectData[0])));
            expect(await controller.main(auditingMockSideEffectData[0].id)).toBe(auditingMockSideEffectData[0]);
        });
    });
});
