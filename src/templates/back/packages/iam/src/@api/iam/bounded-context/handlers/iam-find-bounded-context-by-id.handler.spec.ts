/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindBoundedContextByIdHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindBoundedContextByIdHandler', () =>
{
    let handler: IamFindBoundedContextByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindBoundedContextByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamFindBoundedContextByIdHandler>(IamFindBoundedContextByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindBoundedContextByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindBoundedContextByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an boundedContext by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData[0])));
            expect(
                await handler.main(
                    iamMockBoundedContextData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockBoundedContextData[0]);
        });
    });
});
