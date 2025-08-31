import { Injectable } from '@nestjs/common';
import { GraphQLSchema, printSchema } from 'graphql';

@Injectable()
export class SchemaStoreService
{
    private schema?: GraphQLSchema;
    private sdl?: string;

    load(schema: GraphQLSchema): void
    {
        this.schema = schema;
        this.sdl = printSchema(schema);
    }

    getSchema(): GraphQLSchema
    {
        if (!this.schema) throw new Error('GraphQL schema aún no disponible');
        return this.schema;
    }

    getSDL(): string
    {
        if (!this.sdl) throw new Error('GraphQL SDL aún no disponible');
        return this.sdl;
    }
}