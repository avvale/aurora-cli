import { AuditingCreateHttpCommunicationsHandler, AuditingCreateHttpCommunicationsResolver } from '@api/auditing/http-communication';
import { AuditingCreateHttpCommunicationInput } from '@api/graphql';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateHttpCommunicationsResolver', () =>
{
    let resolver: AuditingCreateHttpCommunicationsResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCreateHttpCommunicationsResolver,
                {
                    provide : AuditingCreateHttpCommunicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingCreateHttpCommunicationsResolver>(AuditingCreateHttpCommunicationsResolver);
    });

    test('AuditingCreateHttpCommunicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingCreateHttpCommunicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an httpCommunications created', async () =>
        {
            expect(await resolver.main(<AuditingCreateHttpCommunicationInput[]>auditingMockHttpCommunicationData)).toBe(undefined);
        });
    });
});
