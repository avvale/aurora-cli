/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdatePermissionsInput } from '@api/graphql';
import { IamUpdatePermissionsHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionsHandler', () => {
    let handler: IamUpdatePermissionsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdatePermissionsHandler,
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

        handler = module.get<IamUpdatePermissionsHandler>(
            IamUpdatePermissionsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamUpdatePermissionsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdatePermissionsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a permissions updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(iamMockPermissionData[0])),
            );
            expect(
                await handler.main(
                    <IamUpdatePermissionsInput>iamMockPermissionData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockPermissionData[0]);
        });
    });
});
