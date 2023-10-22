/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingDeleteHttpCommunicationsHandler, AuditingDeleteHttpCommunicationsResolver } from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteHttpCommunicationsResolver', () =>
{
    let resolver: AuditingDeleteHttpCommunicationsResolver;
    let handler: AuditingDeleteHttpCommunicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingDeleteHttpCommunicationsResolver,
                {
                    provide : AuditingDeleteHttpCommunicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingDeleteHttpCommunicationsResolver>(AuditingDeleteHttpCommunicationsResolver);
        handler = module.get<AuditingDeleteHttpCommunicationsHandler>(AuditingDeleteHttpCommunicationsHandler);
    });

    test('AuditingDeleteHttpCommunicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingDeleteHttpCommunicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an auditingMockHttpCommunicationData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockHttpCommunicationData)));
            expect(await resolver.main()).toBe(auditingMockHttpCommunicationData);
        });
    });
});
