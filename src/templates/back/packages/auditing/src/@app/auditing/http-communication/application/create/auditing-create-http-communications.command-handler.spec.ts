import {
    AuditingCreateHttpCommunicationsCommand,
    auditingMockHttpCommunicationData,
} from '@app/auditing/http-communication';
import { AuditingCreateHttpCommunicationsCommandHandler } from '@app/auditing/http-communication/application/create/auditing-create-http-communications.command-handler';
import { AuditingCreateHttpCommunicationsService } from '@app/auditing/http-communication/application/create/auditing-create-http-communications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('auditingCreateHttpCommunicationsCommandHandler', () => {
    let commandHandler: AuditingCreateHttpCommunicationsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCreateHttpCommunicationsCommandHandler,
                {
                    provide: AuditingCreateHttpCommunicationsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler =
            module.get<AuditingCreateHttpCommunicationsCommandHandler>(
                AuditingCreateHttpCommunicationsCommandHandler,
            );
    });

    describe('main', () => {
        test('AuditingCreateHttpCommunicationsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return AuditingMockHttpCommunicationData created', async () => {
            expect(
                await commandHandler.execute(
                    new AuditingCreateHttpCommunicationsCommand(
                        auditingMockHttpCommunicationData,
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
