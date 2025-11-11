import {
    IamDeleteRoleAccountByIdCommand,
    iamMockRoleAccountData,
} from '@app/iam/role-account';
import { IamDeleteRoleAccountByIdCommandHandler } from '@app/iam/role-account/application/delete/iam-delete-role-account-by-id.command-handler';
import { IamDeleteRoleAccountByIdService } from '@app/iam/role-account/application/delete/iam-delete-role-account-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRoleAccountByIdCommandHandler', () => {
    let commandHandler: IamDeleteRoleAccountByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteRoleAccountByIdCommandHandler,
                {
                    provide: IamDeleteRoleAccountByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamDeleteRoleAccountByIdCommandHandler>(
            IamDeleteRoleAccountByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('IamDeleteRoleAccountByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteRoleAccountByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new IamDeleteRoleAccountByIdCommand(
                        iamMockRoleAccountData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
