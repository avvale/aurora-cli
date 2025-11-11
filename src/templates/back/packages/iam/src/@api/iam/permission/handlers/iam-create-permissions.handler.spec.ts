import { IamCreatePermissionsHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionsHandler', () => {
    let handler: IamCreatePermissionsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreatePermissionsHandler,
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamCreatePermissionsHandler>(
            IamCreatePermissionsHandler,
        );
    });

    describe('main', () => {
        test('IamCreatePermissionsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an iamMockPermissionData created', async () => {
            expect(await handler.main(iamMockPermissionData)).toBe(true);
        });
    });
});
