/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamResetPasswordUserHandler } from './iam-reset-password-user.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamResetPasswordUserHandler', () =>
{
    let handler: IamResetPasswordUserHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamResetPasswordUserHandler,
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

        handler     = module.get<IamResetPasswordUserHandler>(IamResetPasswordUserHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamResetPasswordUserHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});