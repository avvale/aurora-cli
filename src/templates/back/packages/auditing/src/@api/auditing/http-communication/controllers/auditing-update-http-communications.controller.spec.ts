/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingUpdateHttpCommunicationsController } from './auditing-update-http-communications.controller';
import { AuditingUpdateHttpCommunicationsHandler } from '../handlers/auditing-update-http-communications.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingUpdateHttpCommunicationsController', () =>
{
    let controller: AuditingUpdateHttpCommunicationsController;
    let handler: AuditingUpdateHttpCommunicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingUpdateHttpCommunicationsController,
            ],
            providers: [
                {
                    provide : AuditingUpdateHttpCommunicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingUpdateHttpCommunicationsController>(AuditingUpdateHttpCommunicationsController);
        handler = module.get<AuditingUpdateHttpCommunicationsHandler>(AuditingUpdateHttpCommunicationsHandler);
    });

    describe('main', () =>
    {
        test('AuditingUpdateHttpCommunicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a httpCommunications updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await controller.main(httpCommunications[0])).toBe(httpCommunications[0]);
        });
    });
});