/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindBoundedContextHandler, IamFindBoundedContextResolver } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindBoundedContextResolver', () =>
{
    let resolver: IamFindBoundedContextResolver;
    let handler: IamFindBoundedContextHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindBoundedContextResolver,
                {
                    provide : IamFindBoundedContextHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamFindBoundedContextResolver>(IamFindBoundedContextResolver);
        handler = module.get<IamFindBoundedContextHandler>(IamFindBoundedContextHandler);
    });

    test('IamFindBoundedContextResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindBoundedContextResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a boundedContext', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData[0])));
            expect(await resolver.main()).toBe(iamMockBoundedContextData[0]);
        });
    });
});
