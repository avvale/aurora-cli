/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingUpdateSideEffectsResolver } from './auditing-update-side-effects.resolver';
import { AuditingUpdateSideEffectsHandler } from '../handlers/auditing-update-side-effects.handler';
import { AuditingUpdateSideEffectsInput } from '@api/graphql';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingUpdateSideEffectsResolver', () =>
{
    let resolver: AuditingUpdateSideEffectsResolver;
    let handler: AuditingUpdateSideEffectsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingUpdateSideEffectsResolver,
                {
                    provide : AuditingUpdateSideEffectsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingUpdateSideEffectsResolver>(AuditingUpdateSideEffectsResolver);
        handler = module.get<AuditingUpdateSideEffectsHandler>(AuditingUpdateSideEffectsHandler);
    });

    test('AuditingUpdateSideEffectsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingUpdateSideEffectsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a sideEffects updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await resolver.main(<AuditingUpdateSideEffectsInput>sideEffects[0])).toBe(sideEffects[0]);
        });
    });
});