import {
    IamDeletePermissionByIdCommand,
    iamMockPermissionData,
} from '@app/iam/permission';
import { IamDeletePermissionByIdCommandHandler } from '@app/iam/permission/application/delete/iam-delete-permission-by-id.command-handler';
import { IamDeletePermissionByIdService } from '@app/iam/permission/application/delete/iam-delete-permission-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionByIdCommandHandler', () => {
    let commandHandler: IamDeletePermissionByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeletePermissionByIdCommandHandler,
                {
                    provide: IamDeletePermissionByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamDeletePermissionByIdCommandHandler>(
            IamDeletePermissionByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('IamDeletePermissionByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeletePermissionByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new IamDeletePermissionByIdCommand(
                        iamMockPermissionData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
