/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteTagByIdHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTagByIdController', () => {
    let handler: IamDeleteTagByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeleteTagByIdHandler,
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

        handler = module.get<IamDeleteTagByIdHandler>(IamDeleteTagByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('IamDeleteTagByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an tag deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTagData[0])),
            );
            expect(
                await handler.main(iamMockTagData[0].id, {}, 'Europe/Madrid'),
            ).toBe(iamMockTagData[0]);
        });
    });
});
