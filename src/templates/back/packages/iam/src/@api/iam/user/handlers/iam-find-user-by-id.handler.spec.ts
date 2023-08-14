/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindUserByIdHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindUserByIdHandler', () =>
{
    let handler: IamFindUserByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindUserByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamFindUserByIdHandler>(IamFindUserByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindUserByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindUserByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an user by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockUserData[0])));
            expect(
                await handler.main(
                    iamMockUserData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockUserData[0]);
        });
    });
});
