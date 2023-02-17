import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingCreateHttpCommunicationsResolver } from './auditing-create-http-communications.resolver';
import { AuditingCreateHttpCommunicationsHandler } from '../handlers/auditing-create-http-communications.handler';
import { AuditingCreateHttpCommunicationInput } from '@api/graphql';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingCreateHttpCommunicationsResolver', () =>
{
    let resolver: AuditingCreateHttpCommunicationsResolver;
    let handler: AuditingCreateHttpCommunicationsHandler;

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
        handler = module.get<AuditingCreateHttpCommunicationsHandler>(AuditingCreateHttpCommunicationsHandler);
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
            expect(await resolver.main(<AuditingCreateHttpCommunicationInput[]>httpCommunications)).toBe(undefined);
        });
    });
});