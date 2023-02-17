/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingGetHttpCommunicationsResolver } from './auditing-get-http-communications.resolver';
import { AuditingGetHttpCommunicationsHandler } from '../handlers/auditing-get-http-communications.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

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

        test('should return a httpCommunications', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications)));
            expect(await resolver.main()).toBe(httpCommunications);
        });
    });
});