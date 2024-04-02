/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindTagByIdHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTagByIdHandler', () =>
{
    let handler: IamFindTagByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindTagByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamFindTagByIdHandler>(IamFindTagByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindTagByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindTagByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an tag by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData[0])));
            expect(
                await handler.main(
                    iamMockTagData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockTagData[0]);
        });
    });
});
