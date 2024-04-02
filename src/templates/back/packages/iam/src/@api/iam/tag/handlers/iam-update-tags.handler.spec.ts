/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTagsInput } from '@api/graphql';
import { IamUpdateTagsHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTagsHandler', () =>
{
    let handler: IamUpdateTagsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateTagsHandler,
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

        handler = module.get<IamUpdateTagsHandler>(IamUpdateTagsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamUpdateTagsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateTagsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a tags updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData[0])));
            expect(
                await handler.main(
                    <IamUpdateTagsInput>iamMockTagData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockTagData[0]);
        });
    });
});
