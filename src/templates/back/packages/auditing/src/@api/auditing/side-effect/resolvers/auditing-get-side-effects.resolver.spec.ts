/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingGetSideEffectsResolver } from './auditing-get-side-effects.resolver';
import { AuditingGetSideEffectsHandler } from '../handlers/auditing-get-side-effects.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingGetSideEffectsResolver', () =>
{
    let resolver: AuditingGetSideEffectsResolver;
    let handler: AuditingGetSideEffectsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingGetSideEffectsResolver,
                {
                    provide : AuditingGetSideEffectsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingGetSideEffectsResolver>(AuditingGetSideEffectsResolver);
        handler = module.get<AuditingGetSideEffectsHandler>(AuditingGetSideEffectsHandler);
    });

    test('AuditingGetSideEffectsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingGetSideEffectsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a sideEffects', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects)));
            expect(await resolver.main()).toBe(sideEffects);
        });
    });
});