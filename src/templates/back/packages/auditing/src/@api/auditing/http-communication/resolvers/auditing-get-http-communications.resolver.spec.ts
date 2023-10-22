/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingGetHttpCommunicationsHandler, AuditingGetHttpCommunicationsResolver } from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingGetHttpCommunicationsResolver', () =>
{
    let resolver: AuditingGetHttpCommunicationsResolver;
    let handler: AuditingGetHttpCommunicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingGetHttpCommunicationsResolver,
                {
                    provide : AuditingGetHttpCommunicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingGetHttpCommunicationsResolver>(AuditingGetHttpCommunicationsResolver);
        handler = module.get<AuditingGetHttpCommunicationsHandler>(AuditingGetHttpCommunicationsHandler);
    });

    test('AuditingGetHttpCommunicationsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingGetHttpCommunicationsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a auditingMockHttpCommunicationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockHttpCommunicationData)));
            expect(await resolver.main()).toBe(auditingMockHttpCommunicationData);
        });
    });
});
