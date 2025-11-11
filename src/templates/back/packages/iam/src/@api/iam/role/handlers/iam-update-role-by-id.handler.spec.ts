/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateRoleByIdInput } from '@api/graphql';
import { IamUpdateRoleByIdHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRoleByIdHandler', () => {
    let handler: IamUpdateRoleByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdateRoleByIdHandler,
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

        handler = module.get<IamUpdateRoleByIdHandler>(
            IamUpdateRoleByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamUpdateRoleByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdateRoleByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a role updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockRoleData[0])),
            );
            expect(
                await handler.main(
                    <IamUpdateRoleByIdInput>iamMockRoleData[0],
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockRoleData[0]);
        });
    });
});
