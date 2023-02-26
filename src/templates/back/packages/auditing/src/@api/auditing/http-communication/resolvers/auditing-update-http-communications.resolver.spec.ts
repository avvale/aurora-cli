/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingUpdateHttpCommunicationsResolver } from './auditing-update-http-communications.resolver';
import { AuditingUpdateHttpCommunicationsHandler } from '../handlers/auditing-update-http-communications.handler';
import { AuditingUpdateHttpCommunicationsInput } from '@api/graphql';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

describe('AuditingUpdateHttpCommunicationsResolver', () =>
{
    let resolver: AuditingUpdateHttpCommunicationsResolver;
    let handler: AuditingUpdateHttpCommunicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingUpdateHttpCommunicationsResolver,
                {
                    provide : AuditingUpdateHttpCommunicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingUpdateHttpCommunicationsResolver>(AuditingUpdateHttpCommunicationsResolver);
        handler = module.get<AuditingUpdateHttpCommunicationsHandler>(AuditingUpdateHttpCommunicationsHandler);
    });

    test('AuditingUpdateHttpCommunicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingUpdateHttpCommunicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a httpCommunications updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await resolver.main(<AuditingUpdateHttpCommunicationsInput>httpCommunications[0])).toBe(httpCommunications[0]);
        });
    });
});