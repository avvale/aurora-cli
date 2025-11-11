/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteUserByIdHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteUserByIdController', () => {
    let handler: IamDeleteUserByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeleteUserByIdHandler,
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

        handler = module.get<IamDeleteUserByIdHandler>(
            IamDeleteUserByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('IamDeleteUserByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an user deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockUserData[0])),
            );
            expect(
                await handler.main(iamMockUserData[0].id, {}, 'Europe/Madrid'),
            ).toBe(iamMockUserData[0]);
        });
    });
});
