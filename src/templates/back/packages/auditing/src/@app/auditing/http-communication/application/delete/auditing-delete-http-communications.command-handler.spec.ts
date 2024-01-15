import { AuditingDeleteHttpCommunicationsCommand } from '@app/auditing/http-communication';
import { AuditingDeleteHttpCommunicationsCommandHandler } from '@app/auditing/http-communication/application/delete/auditing-delete-http-communications.command-handler';
import { AuditingDeleteHttpCommunicationsService } from '@app/auditing/http-communication/application/delete/auditing-delete-http-communications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteHttpCommunicationsCommandHandler', () =>
{
    let commandHandler: AuditingDeleteHttpCommunicationsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingDeleteHttpCommunicationsCommandHandler,
                {
                    provide : AuditingDeleteHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingDeleteHttpCommunicationsCommandHandler>(AuditingDeleteHttpCommunicationsCommandHandler);
    });

    describe('main', () =>
    {
        test('AuditingDeleteHttpCommunicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AuditingDeleteHttpCommunicationsCommand(),
            )).toBe(undefined);
        });
    });
});
