import { IamCreateTagInput } from '@api/graphql';
import { IamCreateTagsHandler, IamCreateTagsResolver } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTagsResolver', () =>
{
    let resolver: IamCreateTagsResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTagsResolver,
                {
                    provide : IamCreateTagsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamCreateTagsResolver>(IamCreateTagsResolver);
    });

    test('IamCreateTagsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateTagsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tags created', async () =>
        {
            expect(await resolver.main(<IamCreateTagInput[]>iamMockTagData)).toBe(undefined);
        });
    });
});
