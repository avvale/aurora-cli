/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingUpsertSideEffectHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpsertSideEffectHandler', () =>
{
    let handler: AuditingUpsertSideEffectHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingUpsertSideEffectHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AuditingUpsertSideEffectHandler>(AuditingUpsertSideEffectHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AuditingUpsertSideEffectHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an sideEffect upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(auditingMockSideEffectData[0])));
            expect(
                await handler.main(
                    auditingMockSideEffectData[0],
                    'Europe/Madrid',
                ))
                .toBe(auditingMockSideEffectData[0]);
        });
    });
});
