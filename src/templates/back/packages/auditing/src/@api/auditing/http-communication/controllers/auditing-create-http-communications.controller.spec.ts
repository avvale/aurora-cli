import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingCreateHttpCommunicationsController } from './auditing-create-http-communications.controller';
import { AuditingCreateHttpCommunicationsHandler } from '../handlers/auditing-create-http-communications.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingCreateHttpCommunicationsController', () =>
{
    let controller: AuditingCreateHttpCommunicationsController;
    let handler: AuditingCreateHttpCommunicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AuditingCreateHttpCommunicationsController,
            ],
            providers: [
                {
                    provide : AuditingCreateHttpCommunicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingCreateHttpCommunicationsController>(AuditingCreateHttpCommunicationsController);
        handler = module.get<AuditingCreateHttpCommunicationsHandler>(AuditingCreateHttpCommunicationsHandler);
    });

    describe('main', () =>
    {
        test('AuditingCreateHttpCommunicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an httpCommunications created', async () =>
        {
            expect(await controller.main(httpCommunications)).toBe(undefined);
        });
    });
});