import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteHttpCommunicationsCommandHandler } from './auditing-delete-http-communications.command-handler';
import { AuditingDeleteHttpCommunicationsCommand } from './auditing-delete-http-communications.command';
import { AuditingDeleteHttpCommunicationsService } from './auditing-delete-http-communications.service';

describe('AuditingDeleteHttpCommunicationsCommandHandler', () =>
{
    let commandHandler: AuditingDeleteHttpCommunicationsCommandHandler;
    let service: AuditingDeleteHttpCommunicationsService;

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
        service = module.get<AuditingDeleteHttpCommunicationsService>(AuditingDeleteHttpCommunicationsService);
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
