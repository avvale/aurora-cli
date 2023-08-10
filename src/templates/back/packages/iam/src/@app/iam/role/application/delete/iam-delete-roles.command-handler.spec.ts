import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteRolesCommandHandler } from './iam-delete-roles.command-handler';
import { IamDeleteRolesCommand } from './iam-delete-roles.command';
import { IamDeleteRolesService } from './iam-delete-roles.service';

describe('IamDeleteRolesCommandHandler', () =>
{
    let commandHandler: IamDeleteRolesCommandHandler;
    let service: IamDeleteRolesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteRolesCommandHandler,
                {
                    provide : IamDeleteRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteRolesCommandHandler>(IamDeleteRolesCommandHandler);
        service = module.get<IamDeleteRolesService>(IamDeleteRolesService);
    });

    describe('main', () =>
    {
        test('IamDeleteRolesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteRolesCommand(),
            )).toBe(undefined);
        });
    });
});
