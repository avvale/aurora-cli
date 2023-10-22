import { AuditingFindHttpCommunicationByIdController, AuditingFindHttpCommunicationByIdHandler } from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindHttpCommunicationByIdController', () =>
{
    let controller: AuditingFindHttpCommunicationByIdController;
    let handler: AuditingFindHttpCommunicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingFindHttpCommunicationByIdController,
            ],
            providers: [
                {
                    provide : AuditingFindHttpCommunicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingFindHttpCommunicationByIdController>(AuditingFindHttpCommunicationByIdController);
        handler = module.get<AuditingFindHttpCommunicationByIdHandler>(AuditingFindHttpCommunicationByIdHandler);
    });

    describe('main', () =>
    {
        test('AuditingFindHttpCommunicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an httpCommunication by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockHttpCommunicationData[0])));
            expect(await controller.main(auditingMockHttpCommunicationData[0].id)).toBe(auditingMockHttpCommunicationData[0]);
        });
    });
});
