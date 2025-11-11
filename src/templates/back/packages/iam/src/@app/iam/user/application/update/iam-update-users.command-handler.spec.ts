import { iamMockUserData, IamUpdateUsersCommand } from '@app/iam/user';
import { IamUpdateUsersCommandHandler } from '@app/iam/user/application/update/iam-update-users.command-handler';
import { IamUpdateUsersService } from '@app/iam/user/application/update/iam-update-users.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateUsersCommandHandler', () => {
    let commandHandler: IamUpdateUsersCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateUsersCommandHandler,
                {
                    provide: IamUpdateUsersService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamUpdateUsersCommandHandler>(
            IamUpdateUsersCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateUsersCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an users updated', async () => {
            expect(
                await commandHandler.execute(
                    new IamUpdateUsersCommand(
                        {
                            id: iamMockUserData[0].id,
                            rowId: iamMockUserData[0].rowId,
                            accountId: iamMockUserData[0].accountId,
                            name: iamMockUserData[0].name,
                            surname: iamMockUserData[0].surname,
                            avatar: iamMockUserData[0].avatar,
                            mobile: iamMockUserData[0].mobile,
                            langId: iamMockUserData[0].langId,
                            password: iamMockUserData[0].password,
                            isTwoFactorAuthenticationEnabled:
                                iamMockUserData[0]
                                    .isTwoFactorAuthenticationEnabled,
                            twoFactorAuthenticationSecret:
                                iamMockUserData[0]
                                    .twoFactorAuthenticationSecret,
                            rememberToken: iamMockUserData[0].rememberToken,
                            meta: iamMockUserData[0].meta,
                        },
                        {},
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
