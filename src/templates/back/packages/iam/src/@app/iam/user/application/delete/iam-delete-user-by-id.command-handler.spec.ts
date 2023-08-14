import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteUserByIdCommandHandler } from './iam-delete-user-by-id.command-handler';
import { iamMockUserData } from '@app/iam/user/infrastructure/mock/iam-mock-user.data';
import { IamDeleteUserByIdCommand } from './iam-delete-user-by-id.command';
import { IamDeleteUserByIdService } from './iam-delete-user-by-id.service';

describe('IamDeleteUserByIdCommandHandler', () =>
{
    let commandHandler: IamDeleteUserByIdCommandHandler;
    let service: IamDeleteUserByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteUserByIdCommandHandler,
                {
                    provide : IamDeleteUserByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteUserByIdCommandHandler>(IamDeleteUserByIdCommandHandler);
        service = module.get<IamDeleteUserByIdService>(IamDeleteUserByIdService);
    });

    describe('main', () =>
    {
        test('IamDeleteUserByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteUserByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteUserByIdCommand(
                    iamMockUserData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
