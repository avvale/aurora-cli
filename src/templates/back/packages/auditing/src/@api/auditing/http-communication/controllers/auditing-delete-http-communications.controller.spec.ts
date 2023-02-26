/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteHttpCommunicationsController } from './auditing-delete-http-communications.controller';
import { AuditingDeleteHttpCommunicationsHandler } from '../handlers/auditing-delete-http-communications.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

describe('AuditingDeleteHttpCommunicationsController', () =>
{
    let controller: AuditingDeleteHttpCommunicationsController;
    let handler: AuditingDeleteHttpCommunicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingDeleteHttpCommunicationsController,
            ],
            providers: [
                {
                    provide : AuditingDeleteHttpCommunicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingDeleteHttpCommunicationsController>(AuditingDeleteHttpCommunicationsController);
        handler = module.get<AuditingDeleteHttpCommunicationsHandler>(AuditingDeleteHttpCommunicationsHandler);
    });

    describe('main', () =>
    {
        test('AuditingDeleteHttpCommunicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an httpCommunications deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications)));
            expect(await controller.main()).toBe(httpCommunications);
        });
    });
});