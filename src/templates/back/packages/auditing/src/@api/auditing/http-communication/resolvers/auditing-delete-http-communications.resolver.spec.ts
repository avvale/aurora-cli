/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteHttpCommunicationsResolver } from './auditing-delete-http-communications.resolver';
import { AuditingDeleteHttpCommunicationsHandler } from '../handlers/auditing-delete-http-communications.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

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

        test('should return an httpCommunications deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications)));
            expect(await resolver.main()).toBe(httpCommunications);
        });
    });
});