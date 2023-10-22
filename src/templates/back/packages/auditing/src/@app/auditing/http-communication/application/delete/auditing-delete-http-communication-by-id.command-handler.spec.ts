import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteHttpCommunicationByIdCommandHandler } from './auditing-delete-http-communication-by-id.command-handler';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication/infrastructure/mock/auditing-mock-http-communication.data';
import { AuditingDeleteHttpCommunicationByIdCommand } from './auditing-delete-http-communication-by-id.command';
import { AuditingDeleteHttpCommunicationByIdService } from './auditing-delete-http-communication-by-id.service';

describe('AuditingDeleteHttpCommunicationByIdCommandHandler', () =>
{
    let commandHandler: AuditingDeleteHttpCommunicationByIdCommandHandler;
    let service: AuditingDeleteHttpCommunicationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingDeleteHttpCommunicationByIdCommandHandler,
                {
                    provide : AuditingDeleteHttpCommunicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingDeleteHttpCommunicationByIdCommandHandler>(AuditingDeleteHttpCommunicationByIdCommandHandler);
        service = module.get<AuditingDeleteHttpCommunicationByIdService>(AuditingDeleteHttpCommunicationByIdService);
    });

    describe('main', () =>
    {
        test('AuditingDeleteHttpCommunicationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AuditingDeleteHttpCommunicationByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AuditingDeleteHttpCommunicationByIdCommand(
                    auditingMockHttpCommunicationData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
