import { AuditingDeleteHttpCommunicationsController, AuditingDeleteHttpCommunicationsHandler } from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

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

        test('should return an auditingMockHttpCommunicationData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockHttpCommunicationData)));
            expect(await controller.main()).toBe(auditingMockHttpCommunicationData);
        });
    });
});
