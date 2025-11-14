/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AuditingDeleteSideEffectsHandler,
    AuditingDeleteSideEffectsResolver,
} from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteSideEffectsResolver', () => {
    let resolver: AuditingDeleteSideEffectsResolver;
    let handler: AuditingDeleteSideEffectsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingDeleteSideEffectsResolver,
                {
                    provide: AuditingDeleteSideEffectsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<AuditingDeleteSideEffectsResolver>(
            AuditingDeleteSideEffectsResolver,
        );
        handler = module.get<AuditingDeleteSideEffectsHandler>(
            AuditingDeleteSideEffectsHandler,
        );
    });

    test('AuditingDeleteSideEffectsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('AuditingDeleteSideEffectsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an auditingMockSideEffectData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockSideEffectData),
                    ),
            );
            expect(await resolver.main()).toBe(auditingMockSideEffectData);
        });
    });
});
