import { IamCreateRolesHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRolesHandler', () => {
    let handler: IamCreateRolesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateRolesHandler,
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

        handler = module.get<IamCreateRolesHandler>(IamCreateRolesHandler);
    });

    describe('main', () => {
        test('IamCreateRolesHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an iamMockRoleData created', async () => {
            expect(await handler.main(iamMockRoleData)).toBe(true);
        });
    });
});
