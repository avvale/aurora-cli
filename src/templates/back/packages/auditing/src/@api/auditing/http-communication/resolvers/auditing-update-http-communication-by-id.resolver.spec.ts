/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingUpdateHttpCommunicationByIdResolver } from './auditing-update-http-communication-by-id.resolver';
import { AuditingUpdateHttpCommunicationByIdHandler } from '../handlers/auditing-update-http-communication-by-id.handler';
import { AuditingUpdateHttpCommunicationByIdInput } from '@api/graphql';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingUpdateHttpCommunicationByIdResolver', () =>
{
    let resolver: AuditingUpdateHttpCommunicationByIdResolver;
    let handler: AuditingUpdateHttpCommunicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingUpdateHttpCommunicationByIdResolver,
                {
                    provide : AuditingUpdateHttpCommunicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingUpdateHttpCommunicationByIdResolver>(AuditingUpdateHttpCommunicationByIdResolver);
        handler = module.get<AuditingUpdateHttpCommunicationByIdHandler>(AuditingUpdateHttpCommunicationByIdHandler);
    });

    test('AuditingUpdateHttpCommunicationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingUpdateHttpCommunicationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a httpCommunication by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await resolver.main(<AuditingUpdateHttpCommunicationByIdInput>httpCommunications[0])).toBe(httpCommunications[0]);
        });
    });
});