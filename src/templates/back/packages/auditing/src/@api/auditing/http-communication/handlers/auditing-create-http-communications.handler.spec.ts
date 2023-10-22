import { AuditingCreateHttpCommunicationsHandler } from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateHttpCommunicationsHandler', () =>
{
    let handler: AuditingCreateHttpCommunicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCreateHttpCommunicationsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AuditingCreateHttpCommunicationsHandler>(AuditingCreateHttpCommunicationsHandler);
    });

    describe('main', () =>
    {
        test('AuditingCreateHttpCommunicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an auditingMockHttpCommunicationData created', async () =>
        {
            expect(await handler.main(auditingMockHttpCommunicationData)).toBe(true);
        });
    });
});
