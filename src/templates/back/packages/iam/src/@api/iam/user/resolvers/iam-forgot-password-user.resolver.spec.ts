/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamForgotPasswordUserHandler } from '../handlers/iam-forgot-password-user.handler';
import { IamForgotPasswordUserResolver } from './iam-forgot-password-user.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamForgotPasswordUserResolver', () =>
{
    let resolver: IamForgotPasswordUserResolver;
    let handler: IamForgotPasswordUserHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamForgotPasswordUserResolver,
                {
                    provide : IamForgotPasswordUserHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamForgotPasswordUserResolver>(IamForgotPasswordUserResolver);
        handler = module.get<IamForgotPasswordUserHandler>(IamForgotPasswordUserHandler);
    });

    test('IamForgotPasswordUserResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamForgotPasswordUserResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});