/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindUserHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindUserHandler', () =>
{
    let handler: IamFindUserHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindUserHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamFindUserHandler>(IamFindUserHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindUserHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindUserHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a user', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockUserData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockUserData[0]);
        });
    });
});
