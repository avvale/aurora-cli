/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteHttpCommunicationByIdController } from './auditing-delete-http-communication-by-id.controller';
import { AuditingDeleteHttpCommunicationByIdHandler } from '../handlers/auditing-delete-http-communication-by-id.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

describe('AuditingDeleteHttpCommunicationByIdController', () =>
{
    let controller: AuditingDeleteHttpCommunicationByIdController;
    let handler: AuditingDeleteHttpCommunicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingDeleteHttpCommunicationByIdController,
            ],
            providers: [
                {
                    provide : AuditingDeleteHttpCommunicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingDeleteHttpCommunicationByIdController>(AuditingDeleteHttpCommunicationByIdController);
        handler = module.get<AuditingDeleteHttpCommunicationByIdHandler>(AuditingDeleteHttpCommunicationByIdHandler);
    });

    describe('main', () =>
    {
        test('AuditingDeleteHttpCommunicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an httpCommunication deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await controller.main(httpCommunications[0].id)).toBe(httpCommunications[0]);
        });
    });
});