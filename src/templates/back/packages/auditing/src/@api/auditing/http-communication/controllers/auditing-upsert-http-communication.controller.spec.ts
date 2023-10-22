import { AuditingUpsertHttpCommunicationController, AuditingUpsertHttpCommunicationHandler } from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockHttpCommunicationData[0])));
            expect(await controller.main(auditingMockHttpCommunicationData[0])).toBe(auditingMockHttpCommunicationData[0]);
        });
    });
});
