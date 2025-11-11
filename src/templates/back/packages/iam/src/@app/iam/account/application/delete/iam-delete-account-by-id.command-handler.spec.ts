import {
    IamDeleteAccountByIdCommand,
    iamMockAccountData,
} from '@app/iam/account';
import { IamDeleteAccountByIdCommandHandler } from '@app/iam/account/application/delete/iam-delete-account-by-id.command-handler';
import { IamDeleteAccountByIdService } from '@app/iam/account/application/delete/iam-delete-account-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteAccountByIdCommandHandler', () => {
    let commandHandler: IamDeleteAccountByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteAccountByIdCommandHandler,
                {
                    provide: IamDeleteAccountByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamDeleteAccountByIdCommandHandler>(
            IamDeleteAccountByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('IamDeleteAccountByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteAccountByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new IamDeleteAccountByIdCommand(iamMockAccountData[0].id),
                ),
            ).toBe(undefined);
        });
    });
});
