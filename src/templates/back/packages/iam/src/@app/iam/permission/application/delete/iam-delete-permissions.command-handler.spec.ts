import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeletePermissionsCommandHandler } from './iam-delete-permissions.command-handler';
import { IamDeletePermissionsCommand } from './iam-delete-permissions.command';
import { IamDeletePermissionsService } from './iam-delete-permissions.service';

describe('IamDeletePermissionsCommandHandler', () =>
{
    let commandHandler: IamDeletePermissionsCommandHandler;
    let service: IamDeletePermissionsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeletePermissionsCommandHandler,
                {
                    provide : IamDeletePermissionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeletePermissionsCommandHandler>(IamDeletePermissionsCommandHandler);
        service = module.get<IamDeletePermissionsService>(IamDeletePermissionsService);
    });

    describe('main', () =>
    {
        test('IamDeletePermissionsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeletePermissionsCommand(),
            )).toBe(undefined);
        });
    });
});
