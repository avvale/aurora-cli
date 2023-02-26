/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingUpdateHttpCommunicationByIdController } from './auditing-update-http-communication-by-id.controller';
import { AuditingUpdateHttpCommunicationByIdHandler } from '../handlers/auditing-update-http-communication-by-id.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

describe('AuditingUpdateHttpCommunicationByIdController', () =>
{
    let controller: AuditingUpdateHttpCommunicationByIdController;
    let handler: AuditingUpdateHttpCommunicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingUpdateHttpCommunicationByIdController,
            ],
            providers: [
                {
                    provide : AuditingUpdateHttpCommunicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingUpdateHttpCommunicationByIdController>(AuditingUpdateHttpCommunicationByIdController);
        handler = module.get<AuditingUpdateHttpCommunicationByIdHandler>(AuditingUpdateHttpCommunicationByIdHandler);
    });

    describe('main', () =>
    {
        test('AuditingUpdateHttpCommunicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a httpCommunication updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await controller.main(httpCommunications[0])).toBe(httpCommunications[0]);
        });
    });
});