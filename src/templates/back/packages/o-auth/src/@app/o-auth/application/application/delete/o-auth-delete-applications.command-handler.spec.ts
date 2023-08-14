import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteApplicationsCommandHandler } from './o-auth-delete-applications.command-handler';
import { OAuthDeleteApplicationsCommand } from './o-auth-delete-applications.command';
import { OAuthDeleteApplicationsService } from './o-auth-delete-applications.service';

describe('OAuthDeleteApplicationsCommandHandler', () =>
{
    let commandHandler: OAuthDeleteApplicationsCommandHandler;
    let service: OAuthDeleteApplicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteApplicationsCommandHandler,
                {
                    provide : OAuthDeleteApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthDeleteApplicationsCommandHandler>(OAuthDeleteApplicationsCommandHandler);
        service = module.get<OAuthDeleteApplicationsService>(OAuthDeleteApplicationsService);
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthDeleteApplicationsCommand(),
            )).toBe(undefined);
        });
    });
});
