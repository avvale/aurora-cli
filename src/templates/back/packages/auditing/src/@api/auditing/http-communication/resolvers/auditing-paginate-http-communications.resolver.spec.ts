/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingPaginateHttpCommunicationsResolver } from './auditing-paginate-http-communications.resolver';
import { AuditingPaginateHttpCommunicationsHandler } from '../handlers/auditing-paginate-http-communications.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingPaginateHttpCommunicationsResolver', () =>
{
    let resolver: AuditingPaginateHttpCommunicationsResolver;
    let handler: AuditingPaginateHttpCommunicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingPaginateHttpCommunicationsResolver,
                {
                    provide : AuditingPaginateHttpCommunicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver    = module.get<AuditingPaginateHttpCommunicationsResolver>(AuditingPaginateHttpCommunicationsResolver);
        handler = module.get<AuditingPaginateHttpCommunicationsHandler>(AuditingPaginateHttpCommunicationsHandler);
    });

    test('AuditingPaginateHttpCommunicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingPaginateHttpCommunicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a httpCommunications', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : httpCommunications,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : httpCommunications,
            });
        });
    });
});