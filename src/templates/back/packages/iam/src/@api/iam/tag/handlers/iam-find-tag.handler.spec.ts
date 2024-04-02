/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindTagHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTagHandler', () =>
{
    let handler: IamFindTagHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindTagHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamFindTagHandler>(IamFindTagHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindTagHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindTagHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a tag', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockTagData[0]);
        });
    });
});
