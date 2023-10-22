/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingFindSideEffectHandler, AuditingFindSideEffectResolver } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindSideEffectResolver', () =>
{
    let resolver: AuditingFindSideEffectResolver;
    let handler: AuditingFindSideEffectHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingFindSideEffectResolver,
                {
                    provide : AuditingFindSideEffectHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingFindSideEffectResolver>(AuditingFindSideEffectResolver);
        handler = module.get<AuditingFindSideEffectHandler>(AuditingFindSideEffectHandler);
    });

    test('AuditingFindSideEffectResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingFindSideEffectResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a sideEffect', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockSideEffectData[0])));
            expect(await resolver.main()).toBe(auditingMockSideEffectData[0]);
        });
    });
});
