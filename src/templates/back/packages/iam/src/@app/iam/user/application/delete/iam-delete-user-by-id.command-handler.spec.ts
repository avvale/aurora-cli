import { IamDeleteUserByIdCommand, iamMockUserData } from '@app/iam/user';
import { IamDeleteUserByIdCommandHandler } from '@app/iam/user/application/delete/iam-delete-user-by-id.command-handler';
import { IamDeleteUserByIdService } from '@app/iam/user/application/delete/iam-delete-user-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteUserByIdCommandHandler', () => {
    let commandHandler: IamDeleteUserByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteUserByIdCommandHandler,
                {
                    provide: IamDeleteUserByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamDeleteUserByIdCommandHandler>(
            IamDeleteUserByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('IamDeleteUserByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteUserByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new IamDeleteUserByIdCommand(iamMockUserData[0].id),
                ),
            ).toBe(undefined);
        });
    });
});
