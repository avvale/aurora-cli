/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamMeAccountUpdateHandler } from '../handlers/iam-me-account-update.handler';
import { IamMeAccountUpdateResolver } from './iam-me-account-update.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMeAccountUpdateResolver', () =>
{
    let resolver: IamMeAccountUpdateResolver;
    let handler: IamMeAccountUpdateHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamMeAccountUpdateResolver,
                {
                    provide : IamMeAccountUpdateHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamMeAccountUpdateResolver>(IamMeAccountUpdateResolver);
        handler = module.get<IamMeAccountUpdateHandler>(IamMeAccountUpdateHandler);
    });

    test('IamMeAccountUpdateResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamMeAccountUpdateResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});