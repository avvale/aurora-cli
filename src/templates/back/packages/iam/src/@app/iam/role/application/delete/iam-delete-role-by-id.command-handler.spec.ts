import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteRoleByIdCommandHandler } from './iam-delete-role-by-id.command-handler';
import { iamMockRoleData } from '@app/iam/role/infrastructure/mock/iam-mock-role.data';
import { IamDeleteRoleByIdCommand } from './iam-delete-role-by-id.command';
import { IamDeleteRoleByIdService } from './iam-delete-role-by-id.service';

describe('IamDeleteRoleByIdCommandHandler', () =>
{
    let commandHandler: IamDeleteRoleByIdCommandHandler;
    let service: IamDeleteRoleByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteRoleByIdCommandHandler,
                {
                    provide : IamDeleteRoleByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteRoleByIdCommandHandler>(IamDeleteRoleByIdCommandHandler);
        service = module.get<IamDeleteRoleByIdService>(IamDeleteRoleByIdService);
    });

    describe('main', () =>
    {
        test('IamDeleteRoleByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteRoleByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteRoleByIdCommand(
                    iamMockRoleData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
