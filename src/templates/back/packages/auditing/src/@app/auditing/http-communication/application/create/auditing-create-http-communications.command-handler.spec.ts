/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication/infrastructure/mock/auditing-mock-http-communication.data';
import { AuditingCreateHttpCommunicationsCommandHandler } from './auditing-create-http-communications.command-handler';
import { AuditingCreateHttpCommunicationsCommand } from './auditing-create-http-communications.command';
import { AuditingCreateHttpCommunicationsService } from './auditing-create-http-communications.service';

describe('auditingCreateHttpCommunicationsCommandHandler', () =>
{
    let commandHandler: AuditingCreateHttpCommunicationsCommandHandler;
    let service: AuditingCreateHttpCommunicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCreateHttpCommunicationsCommandHandler,
                {
                    provide : AuditingCreateHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingCreateHttpCommunicationsCommandHandler>(AuditingCreateHttpCommunicationsCommandHandler);
        service = module.get<AuditingCreateHttpCommunicationsService>(AuditingCreateHttpCommunicationsService);
    });

    describe('main', () =>
    {
        test('AuditingCreateHttpCommunicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AuditingMockHttpCommunicationData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AuditingCreateHttpCommunicationsCommand(
                    auditingMockHttpCommunicationData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
