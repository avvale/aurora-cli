/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingCreateSideEffectResolver } from './auditing-create-side-effect.resolver';
import { AuditingCreateSideEffectHandler } from '../handlers/auditing-create-side-effect.handler';
import { AuditingCreateSideEffectInput } from '@api/graphql';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingCreateSideEffectResolver', () =>
{
    let resolver: AuditingCreateSideEffectResolver;
    let handler: AuditingCreateSideEffectHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingCreateSideEffectResolver,
                {
                    provide : AuditingCreateSideEffectHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingCreateSideEffectResolver>(AuditingCreateSideEffectResolver);
        handler = module.get<AuditingCreateSideEffectHandler>(AuditingCreateSideEffectHandler);
    });

    test('AuditingCreateSideEffectResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingCreateSideEffectResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an sideEffect created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await resolver.main(<AuditingCreateSideEffectInput>sideEffects[0])).toBe(sideEffects[0]);
        });
    });
});