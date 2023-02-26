/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteHttpCommunicationByIdResolver } from './auditing-delete-http-communication-by-id.resolver';
import { AuditingDeleteHttpCommunicationByIdHandler } from '../handlers/auditing-delete-http-communication-by-id.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

describe('AuditingDeleteHttpCommunicationByIdResolver', () =>
{
    let resolver: AuditingDeleteHttpCommunicationByIdResolver;
    let handler: AuditingDeleteHttpCommunicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingDeleteHttpCommunicationByIdResolver,
                {
                    provide : AuditingDeleteHttpCommunicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingDeleteHttpCommunicationByIdResolver>(AuditingDeleteHttpCommunicationByIdResolver);
        handler = module.get<AuditingDeleteHttpCommunicationByIdHandler>(AuditingDeleteHttpCommunicationByIdHandler);
    });

    test('AuditingDeleteHttpCommunicationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingDeleteHttpCommunicationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an httpCommunication deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await resolver.main(httpCommunications[0].id)).toBe(httpCommunications[0]);
        });
    });
});