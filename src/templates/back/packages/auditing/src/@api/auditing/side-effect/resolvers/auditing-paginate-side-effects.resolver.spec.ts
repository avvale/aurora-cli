/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingPaginateSideEffectsHandler, AuditingPaginateSideEffectsResolver } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingPaginateSideEffectsResolver', () =>
{
    let resolver: AuditingPaginateSideEffectsResolver;
    let handler: AuditingPaginateSideEffectsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingPaginateSideEffectsResolver,
                {
                    provide : AuditingPaginateSideEffectsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingPaginateSideEffectsResolver>(AuditingPaginateSideEffectsResolver);
        handler = module.get<AuditingPaginateSideEffectsHandler>(AuditingPaginateSideEffectsHandler);
    });

    test('AuditingPaginateSideEffectsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingPaginateSideEffectsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a auditingMockSideEffectData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : auditingMockSideEffectData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : auditingMockSideEffectData,
            });
        });
    });
});
