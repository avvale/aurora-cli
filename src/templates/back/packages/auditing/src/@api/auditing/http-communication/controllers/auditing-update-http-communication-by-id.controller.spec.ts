import {
    AuditingUpdateHttpCommunicationByIdController,
    AuditingUpdateHttpCommunicationByIdHandler,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateHttpCommunicationByIdController', () => {
    let controller: AuditingUpdateHttpCommunicationByIdController;
    let handler: AuditingUpdateHttpCommunicationByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [AuditingUpdateHttpCommunicationByIdController],
            providers: [
                {
                    provide: AuditingUpdateHttpCommunicationByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<AuditingUpdateHttpCommunicationByIdController>(
            AuditingUpdateHttpCommunicationByIdController,
        );
        handler = module.get<AuditingUpdateHttpCommunicationByIdHandler>(
            AuditingUpdateHttpCommunicationByIdHandler,
        );
    });

    describe('main', () => {
        test('AuditingUpdateHttpCommunicationByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a httpCommunication updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockHttpCommunicationData[0]),
                    ),
            );
            expect(
                await controller.main(auditingMockHttpCommunicationData[0]),
            ).toBe(auditingMockHttpCommunicationData[0]);
        });
    });
});
