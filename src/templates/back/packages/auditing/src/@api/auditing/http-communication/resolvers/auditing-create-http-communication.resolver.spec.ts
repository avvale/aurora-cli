/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingCreateHttpCommunicationResolver } from './auditing-create-http-communication.resolver';
import { AuditingCreateHttpCommunicationHandler } from '../handlers/auditing-create-http-communication.handler';
import { AuditingCreateHttpCommunicationInput } from '@api/graphql';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingCreateHttpCommunicationResolver', () =>
{
    let resolver: AuditingCreateHttpCommunicationResolver;
    let handler: AuditingCreateHttpCommunicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingCreateHttpCommunicationResolver,
                {
                    provide : AuditingCreateHttpCommunicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingCreateHttpCommunicationResolver>(AuditingCreateHttpCommunicationResolver);
        handler = module.get<AuditingCreateHttpCommunicationHandler>(AuditingCreateHttpCommunicationHandler);
    });

    test('AuditingCreateHttpCommunicationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingCreateHttpCommunicationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an httpCommunication created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await resolver.main(<AuditingCreateHttpCommunicationInput>httpCommunications[0])).toBe(httpCommunications[0]);
        });
    });
});