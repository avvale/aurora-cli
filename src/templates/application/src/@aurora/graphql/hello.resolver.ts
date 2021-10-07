import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class Hello
{
    @Query('hello')
    main(): string
    {
        return 'Hello world!';
    }
}