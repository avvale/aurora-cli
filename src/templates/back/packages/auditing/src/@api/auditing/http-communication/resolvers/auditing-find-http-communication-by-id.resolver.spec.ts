/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingFindHttpCommunicationByIdResolver } from './auditing-find-http-communication-by-id.resolver';
import { AuditingFindHttpCommunicationByIdHandler } from '../handlers/auditing-find-http-communication-by-id.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingFindHttpCommunicationByIdResolver', () =>
{
    let resolver: AuditingFindHttpCommunicationByIdResolver;
    let handler: AuditingFindHttpCommunicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingFindHttpCommunicationByIdResolver,
                {
                    provide : AuditingFindHttpCommunicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingFindHttpCommunicationByIdResolver>(AuditingFindHttpCommunicationByIdResolver);
        handler = module.get<AuditingFindHttpCommunicationByIdHandler>(AuditingFindHttpCommunicationByIdHandler);
    });

    test('AuditingFindHttpCommunicationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingFindHttpCommunicationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an httpCommunication by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await resolver.main(httpCommunications[0].id)).toBe(httpCommunications[0]);
        });
    });
});