/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTagsInput } from '@api/graphql';
import { IamUpdateTagsHandler, IamUpdateTagsResolver } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTagsResolver', () =>
{
    let resolver: IamUpdateTagsResolver;
    let handler: IamUpdateTagsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateTagsResolver,
                {
                    provide : IamUpdateTagsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateTagsResolver>(IamUpdateTagsResolver);
        handler = module.get<IamUpdateTagsHandler>(IamUpdateTagsHandler);
    });

    test('IamUpdateTagsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateTagsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a tags updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData[0])));
            expect(await resolver.main(<IamUpdateTagsInput>iamMockTagData[0])).toBe(iamMockTagData[0]);
        });
    });
});
