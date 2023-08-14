/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockUserData } from '@app/iam/user/infrastructure/mock/iam-mock-user.data';
import { IamCreateUsersCommandHandler } from './iam-create-users.command-handler';
import { IamCreateUsersCommand } from './iam-create-users.command';
import { IamCreateUsersService } from './iam-create-users.service';

describe('iamCreateUsersCommandHandler', () =>
{
    let commandHandler: IamCreateUsersCommandHandler;
    let service: IamCreateUsersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateUsersCommandHandler,
                {
                    provide : IamCreateUsersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreateUsersCommandHandler>(IamCreateUsersCommandHandler);
        service = module.get<IamCreateUsersService>(IamCreateUsersService);
    });

    describe('main', () =>
    {
        test('IamCreateUsersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockUserData createds', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreateUsersCommand(
                    iamMockUserData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
