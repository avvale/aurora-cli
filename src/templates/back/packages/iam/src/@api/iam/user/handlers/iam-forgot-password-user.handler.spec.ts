/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamForgotPasswordUserHandler } from './iam-forgot-password-user.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamForgotPasswordUserHandler', () =>
{
    let handler: IamForgotPasswordUserHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamForgotPasswordUserHandler,
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

        handler     = module.get<IamForgotPasswordUserHandler>(IamForgotPasswordUserHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamForgotPasswordUserHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});