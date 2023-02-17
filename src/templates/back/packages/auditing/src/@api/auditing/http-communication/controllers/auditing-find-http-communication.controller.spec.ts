/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingFindHttpCommunicationController } from './auditing-find-http-communication.controller';
import { AuditingFindHttpCommunicationHandler } from '../handlers/auditing-find-http-communication.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingFindHttpCommunicationController', () =>
{
    let controller: AuditingFindHttpCommunicationController;
    let handler: AuditingFindHttpCommunicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingFindHttpCommunicationController,
            ],
            providers: [
                {
                    provide : AuditingFindHttpCommunicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingFindHttpCommunicationController>(AuditingFindHttpCommunicationController);
        handler = module.get<AuditingFindHttpCommunicationHandler>(AuditingFindHttpCommunicationHandler);
    });

    describe('main', () =>
    {
        test('AuditingFindHttpCommunicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a httpCommunication', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await controller.main()).toBe(httpCommunications[0]);
        });
    });
});