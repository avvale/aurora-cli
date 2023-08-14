/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpsertUserHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertUserHandler', () =>
{
    let handler: IamUpsertUserHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertUserHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamUpsertUserHandler>(IamUpsertUserHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamUpsertUserHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an user upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockUserData[0])));
            expect(
                await handler.main(
                    iamMockUserData[0],
                    'Europe/Madrid',
                ))
                .toBe(iamMockUserData[0]);
        });
    });
});
