import {
    iamMockPermissionData,
    IamUpdatePermissionByIdCommand,
} from '@app/iam/permission';
import { IamUpdatePermissionByIdCommandHandler } from '@app/iam/permission/application/update/iam-update-permission-by-id.command-handler';
import { IamUpdatePermissionByIdService } from '@app/iam/permission/application/update/iam-update-permission-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionByIdCommandHandler', () => {
    let commandHandler: IamUpdatePermissionByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdatePermissionByIdCommandHandler,
                {
                    provide: IamUpdatePermissionByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamUpdatePermissionByIdCommandHandler>(
            IamUpdatePermissionByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdatePermissionByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an permission created', async () => {
            expect(
                await commandHandler.execute(
                    new IamUpdatePermissionByIdCommand(
                        {
                            id: iamMockPermissionData[0].id,
                            rowId: iamMockPermissionData[0].rowId,
                            name: iamMockPermissionData[0].name,
                            boundedContextId:
                                iamMockPermissionData[0].boundedContextId,
                            roleIds: iamMockPermissionData[0].roleIds,
                        },
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
