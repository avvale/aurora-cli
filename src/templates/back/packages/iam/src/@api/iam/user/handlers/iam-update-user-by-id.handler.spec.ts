/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateUserByIdInput } from '@api/graphql';
import { IamUpdateUserByIdHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateUserByIdHandler', () =>
{
    let handler: IamUpdateUserByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateUserByIdHandler,
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

        handler = module.get<IamUpdateUserByIdHandler>(IamUpdateUserByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamUpdateUserByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateUserByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a user updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockUserData[0])));
            expect(
                await handler.main(
                    <IamUpdateUserByIdInput>iamMockUserData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(iamMockUserData[0]);
        });
    });
});
