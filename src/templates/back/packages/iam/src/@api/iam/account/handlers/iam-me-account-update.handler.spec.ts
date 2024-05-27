/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamMeAccountUpdateHandler } from './iam-me-account-update.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMeAccountUpdateHandler', () =>
{
    let handler: IamMeAccountUpdateHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamMeAccountUpdateHandler,
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

        handler     = module.get<IamMeAccountUpdateHandler>(IamMeAccountUpdateHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamMeAccountUpdateHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});