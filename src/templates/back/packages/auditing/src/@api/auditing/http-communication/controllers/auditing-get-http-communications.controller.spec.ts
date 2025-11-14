import {
    AuditingGetHttpCommunicationsController,
    AuditingGetHttpCommunicationsHandler,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingGetHttpCommunicationsController', () => {
    let controller: AuditingGetHttpCommunicationsController;
    let handler: AuditingGetHttpCommunicationsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [AuditingGetHttpCommunicationsController],
            providers: [
                {
                    provide: AuditingGetHttpCommunicationsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<AuditingGetHttpCommunicationsController>(
            AuditingGetHttpCommunicationsController,
        );
        handler = module.get<AuditingGetHttpCommunicationsHandler>(
            AuditingGetHttpCommunicationsHandler,
        );
    });

    describe('main', () => {
        test('AuditingGetHttpCommunicationsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a auditingMockHttpCommunicationData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockHttpCommunicationData),
                    ),
            );
            expect(await controller.main()).toBe(
                auditingMockHttpCommunicationData,
            );
        });
    });
});
