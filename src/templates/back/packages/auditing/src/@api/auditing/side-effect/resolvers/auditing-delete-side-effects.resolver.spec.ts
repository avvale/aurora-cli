/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteSideEffectsResolver } from './auditing-delete-side-effects.resolver';
import { AuditingDeleteSideEffectsHandler } from '../handlers/auditing-delete-side-effects.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingDeleteSideEffectsResolver', () =>
{
    let resolver: AuditingDeleteSideEffectsResolver;
    let handler: AuditingDeleteSideEffectsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingDeleteSideEffectsResolver,
                {
                    provide : AuditingDeleteSideEffectsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingDeleteSideEffectsResolver>(AuditingDeleteSideEffectsResolver);
        handler = module.get<AuditingDeleteSideEffectsHandler>(AuditingDeleteSideEffectsHandler);
    });

    test('AuditingDeleteSideEffectsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingDeleteSideEffectsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an sideEffects deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects)));
            expect(await resolver.main()).toBe(sideEffects);
        });
    });
});