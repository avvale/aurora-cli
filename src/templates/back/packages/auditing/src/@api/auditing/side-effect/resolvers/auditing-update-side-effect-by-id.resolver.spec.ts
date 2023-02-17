/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingUpdateSideEffectByIdResolver } from './auditing-update-side-effect-by-id.resolver';
import { AuditingUpdateSideEffectByIdHandler } from '../handlers/auditing-update-side-effect-by-id.handler';
import { AuditingUpdateSideEffectByIdInput } from '@api/graphql';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingUpdateSideEffectByIdResolver', () =>
{
    let resolver: AuditingUpdateSideEffectByIdResolver;
    let handler: AuditingUpdateSideEffectByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingUpdateSideEffectByIdResolver,
                {
                    provide : AuditingUpdateSideEffectByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingUpdateSideEffectByIdResolver>(AuditingUpdateSideEffectByIdResolver);
        handler = module.get<AuditingUpdateSideEffectByIdHandler>(AuditingUpdateSideEffectByIdHandler);
    });

    test('AuditingUpdateSideEffectByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingUpdateSideEffectByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a sideEffect by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await resolver.main(<AuditingUpdateSideEffectByIdInput>sideEffects[0])).toBe(sideEffects[0]);
        });
    });
});