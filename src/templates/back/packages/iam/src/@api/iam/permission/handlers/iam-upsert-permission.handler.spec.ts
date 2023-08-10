/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpsertPermissionHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertPermissionHandler', () =>
{
    let handler: IamUpsertPermissionHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertPermissionHandler,
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

        handler = module.get<IamUpsertPermissionHandler>(IamUpsertPermissionHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamUpsertPermissionHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an permission upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionData[0])));
            expect(
                await handler.main(
                    iamMockPermissionData[0],
                    'Europe/Madrid',
                ))
                .toBe(iamMockPermissionData[0]);
        });
    });
});
