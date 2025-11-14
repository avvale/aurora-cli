/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AuditingDeleteSideEffectByIdHandler,
    AuditingDeleteSideEffectByIdResolver,
} from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteSideEffectByIdResolver', () => {
    let resolver: AuditingDeleteSideEffectByIdResolver;
    let handler: AuditingDeleteSideEffectByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingDeleteSideEffectByIdResolver,
                {
                    provide: AuditingDeleteSideEffectByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<AuditingDeleteSideEffectByIdResolver>(
            AuditingDeleteSideEffectByIdResolver,
        );
        handler = module.get<AuditingDeleteSideEffectByIdHandler>(
            AuditingDeleteSideEffectByIdHandler,
        );
    });

    test('AuditingDeleteSideEffectByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('AuditingDeleteSideEffectByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an sideEffect deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockSideEffectData[0]),
                    ),
            );
            expect(await resolver.main(auditingMockSideEffectData[0].id)).toBe(
                auditingMockSideEffectData[0],
            );
        });
    });
});
