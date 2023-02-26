/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingCreateHttpCommunicationController } from './auditing-create-http-communication.controller';
import { AuditingCreateHttpCommunicationHandler } from '../handlers/auditing-create-http-communication.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

describe('AuditingCreateHttpCommunicationController', () =>
{
    let controller: AuditingCreateHttpCommunicationController;
    let handler: AuditingCreateHttpCommunicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingCreateHttpCommunicationController,
            ],
            providers: [
                {
                    provide : AuditingCreateHttpCommunicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingCreateHttpCommunicationController>(AuditingCreateHttpCommunicationController);
        handler = module.get<AuditingCreateHttpCommunicationHandler>(AuditingCreateHttpCommunicationHandler);
    });

    describe('main', () =>
    {
        test('AuditingCreateHttpCommunicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an httpCommunication created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await controller.main(httpCommunications[0])).toBe(httpCommunications[0]);
        });
    });
});