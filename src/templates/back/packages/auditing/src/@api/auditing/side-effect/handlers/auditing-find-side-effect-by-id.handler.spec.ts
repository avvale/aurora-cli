/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingFindSideEffectByIdHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindSideEffectByIdHandler', () =>
{
    let handler: AuditingFindSideEffectByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingFindSideEffectByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AuditingFindSideEffectByIdHandler>(AuditingFindSideEffectByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AuditingFindSideEffectByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingFindSideEffectByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an sideEffect by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(auditingMockSideEffectData[0])));
            expect(
                await handler.main(
                    auditingMockSideEffectData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(auditingMockSideEffectData[0]);
        });
    });
});
