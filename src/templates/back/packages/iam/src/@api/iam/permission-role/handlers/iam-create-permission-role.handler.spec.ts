/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreatePermissionRoleHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionRoleHandler', () => {
    let handler: IamCreatePermissionRoleHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamCreatePermissionRoleHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
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

        handler = module.get<IamCreatePermissionRoleHandler>(
            IamCreatePermissionRoleHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('IamCreatePermissionRoleHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an permissionRole created', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockPermissionRoleData[0]),
                    ),
            );
            expect(
                await handler.main(
                    iamMockPermissionRoleData[0],
                    'Europe/Madrid',
                ),
            ).toBe(iamMockPermissionRoleData[0]);
        });
    });
});
