/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingUpsertHttpCommunicationController } from './auditing-upsert-http-communication.controller';
import { AuditingUpsertHttpCommunicationHandler } from '../handlers/auditing-upsert-http-communication.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

describe('AuditingUpsertHttpCommunicationController', () =>
{
    let controller: AuditingUpsertHttpCommunicationController;
    let handler: AuditingUpsertHttpCommunicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingUpsertHttpCommunicationController,
            ],
            providers: [
                {
                    provide : AuditingUpsertHttpCommunicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingUpsertHttpCommunicationController>(AuditingUpsertHttpCommunicationController);
        handler = module.get<AuditingUpsertHttpCommunicationHandler>(AuditingUpsertHttpCommunicationHandler);
    });

    describe('main', () =>
    {
        test('AuditingUpsertHttpCommunicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an httpCommunication upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await controller.main(httpCommunications[0])).toBe(httpCommunications[0]);
        });
    });
});