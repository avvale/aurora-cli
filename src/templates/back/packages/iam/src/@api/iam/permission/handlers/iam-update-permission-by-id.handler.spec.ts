/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdatePermissionByIdInput } from '@api/graphql';
import { IamUpdatePermissionByIdHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionByIdHandler', () => {
    let handler: IamUpdatePermissionByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdatePermissionByIdHandler,
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

        handler = module.get<IamUpdatePermissionByIdHandler>(
            IamUpdatePermissionByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamUpdatePermissionByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdatePermissionByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a permission updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(iamMockPermissionData[0])),
            );
            expect(
                await handler.main(
                    <IamUpdatePermissionByIdInput>iamMockPermissionData[0],
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockPermissionData[0]);
        });
    });
});
