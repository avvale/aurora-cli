/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindPermissionRoleByIdHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionRoleByIdHandler', () => {
    let handler: IamFindPermissionRoleByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindPermissionRoleByIdHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamFindPermissionRoleByIdHandler>(
            IamFindPermissionRoleByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindPermissionRoleByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamFindPermissionRoleByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an permissionRole by id', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockPermissionRoleData[0]),
                    ),
            );
            expect(
                await handler.main(
                    iamMockPermissionRoleData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockPermissionRoleData[0]);
        });
    });
});
