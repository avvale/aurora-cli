/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetBoundedContextsHandler, IamGetBoundedContextsResolver } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetBoundedContextsResolver', () =>
{
    let resolver: IamGetBoundedContextsResolver;
    let handler: IamGetBoundedContextsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetBoundedContextsResolver,
                {
                    provide : IamGetBoundedContextsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamGetBoundedContextsResolver>(IamGetBoundedContextsResolver);
        handler = module.get<IamGetBoundedContextsHandler>(IamGetBoundedContextsHandler);
    });

    test('IamGetBoundedContextsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetBoundedContextsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a iamMockBoundedContextData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData)));
            expect(await resolver.main()).toBe(iamMockBoundedContextData);
        });
    });
});
