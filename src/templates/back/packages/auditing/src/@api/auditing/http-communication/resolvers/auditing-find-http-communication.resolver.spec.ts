/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingFindHttpCommunicationResolver } from './auditing-find-http-communication.resolver';
import { AuditingFindHttpCommunicationHandler } from '../handlers/auditing-find-http-communication.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

describe('AuditingFindHttpCommunicationResolver', () =>
{
    let resolver: AuditingFindHttpCommunicationResolver;
    let handler: AuditingFindHttpCommunicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingFindHttpCommunicationResolver,
                {
                    provide : AuditingFindHttpCommunicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingFindHttpCommunicationResolver>(AuditingFindHttpCommunicationResolver);
        handler = module.get<AuditingFindHttpCommunicationHandler>(AuditingFindHttpCommunicationHandler);
    });

    test('AuditingFindHttpCommunicationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingFindHttpCommunicationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a httpCommunication', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await resolver.main()).toBe(httpCommunications[0]);
        });
    });
});