/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingPaginateSideEffectsResolver } from './auditing-paginate-side-effects.resolver';
import { AuditingPaginateSideEffectsHandler } from '../handlers/auditing-paginate-side-effects.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

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

        test('should return a sideEffects', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : sideEffects,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : sideEffects,
            });
        });
    });
});