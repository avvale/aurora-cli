import { Property } from './property';
import { SqlRelationship, SqlType } from './../types';

export class Properties
{
    timestampFields : string[] = ['created_at', 'updated_at', 'deleted_at'];
    deletedAtField  : string[] = ['deleted_at'];

    constructor(
        public properties: Property[] = []
    ) {}

    *[Symbol.iterator]()
    {
        for (const property of this.properties) yield property;
    }

    get length(): number
    {
        return this.properties.length;
    }

    get withoutTimestamps(): Property[]
    {
        return this.properties.filter(property => !this.timestampFields.includes(property.name));
    }

    get withoutDeletedAt(): Property[]
    {
        return this.properties.filter(property => !this.deletedAtField.includes(property.name));
    }

    get withRelationship(): Property[]
    {
        return this.properties.filter(property => property.relationship);
    }

    get withRelationshipOneToOne(): Property[]
    {
        return this.properties.filter(property => property.relationship === SqlRelationship.ONE_TO_ONE);
    }

    get withRelationshipOneToOneWithRelationshipField(): Property[]
    {
        return this.withRelationshipOneToOne.filter(property => !!property.relationshipField);
    }

    get withRelationshipOneToOneWithoutRelationshipField(): Property[]
    {
        return this.withRelationshipOneToOne.filter(property => !property.relationshipField);
    }

    get withRelationshipManyToOne(): Property[]
    {
        return this.properties.filter(property => property.relationship === SqlRelationship.MANY_TO_ONE);
    }

    get withRelationshipOneToMany(): Property[]
    {
        return this.properties.filter(property => property.relationship === SqlRelationship.ONE_TO_MANY);
    }

    get withRelationshipManyToMany(): Property[]
    {
        return this.properties.filter(property => property.relationship === SqlRelationship.MANY_TO_MANY);
    }

    get withRelationshipIntermediateTable(): Property[]
    {
        return this.properties.filter(property => !!property.intermediateTable);
    }

    get withRelationshipType(): Property[]
    {
        return this.properties.filter(property => property.type === SqlType.RELATIONSHIP);
    }

    get withTimezone(): Property[]
    {
        return this.properties.filter(property => property.hasTimezone);
    }

    get id(): Property | undefined
    {
        return this.properties.find(property => property.type === SqlType.ID);
    }

    // data for component
    // aggregate
    get aggregate(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));   // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    // commands
    get createCommand(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get updateCommand(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    // commands handler
    get createCommandHandler(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get updateCommandHandler(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    // queries handler
    get findQueryHandler(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY);    // exclude one to many relations
    }

    get findByIdQueryHandler(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY);    // exclude one to many relations
    }

    get getQueryHandler(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY);    // exclude one to many relations
    }

    // services
    get createService(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get updateService(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    // events
    get createdEvent(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get updatedEvent(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get deletedEvent(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    // controllers
    get createController(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get updateController(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    // resolvers
    get createResolver(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get updateResolver(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    // graphql
    get graphqlType(): Property[]
    {
        return this.properties;    // exclude one to many relations
    }

    get graphqlInput(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY);                                     // exclude one to many relations
            //.filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));  // exclude one to many relations
    }

    // DTOs
    get dto(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));   // exclude one to one relations without relationshipField to avoid circular dependency
    }

    get createDto(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to many relations
    }

    get updateDto(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to many relations
    }

    // models
    get modelColumns(): Property[]
    {
        return this.properties; // exclude one to many relations
    }

    get schemaRelations(): Property[]
    {
        return this.properties.filter(property => property.relationship);               // only relationship
    }

    // postman
    get postmanGraphQLCreateQuery(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_ONE)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_MANY)                                     // exclude many to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get postmanGraphQLGetQuery(): Property[]
    {
        return this.properties
            .filter(property => !this.deletedAtField.includes(property.name))                                               // exclude deleteAt
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_ONE)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_MANY)                                     // exclude many to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get postmanGraphQLFindQuery(): Property[]
    {
        return this.properties
            .filter(property => !this.deletedAtField.includes(property.name))                                               // exclude deleteAt
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_ONE)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_MANY)                                     // exclude many to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get postmanGraphQLFindByIdQuery(): Property[]
    {
        return this.properties
            .filter(property => !this.deletedAtField.includes(property.name))                                               // exclude deleteAt
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_ONE)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_MANY)                                     // exclude many to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get postmanGraphQLUpdateQuery(): Property[]
    {
        return this.properties
            .filter(property => !this.deletedAtField.includes(property.name))                                               // exclude deleteAt
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_ONE)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_MANY)                                     // exclude many to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get postmanGraphQLCreateVariables(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get postmanGraphQLUpdateVariables(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get postmanGraphQLDeleteQuery(): Property[]
    {
        return this.properties
            .filter(property => !this.deletedAtField.includes(property.name))                                               // exclude deleteAt
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_ONE)                                      // exclude one to many relations
            .filter(property => property.relationship !== SqlRelationship.MANY_TO_MANY)                                     // exclude many to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get postmanRestCreate(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to many relations
    }

    get postmanRestUpdate(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to many relations
    }

    // data for testing
    get test(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to many relations
    }

    get isNotNullable(): Property[]
    {
        return this.properties.filter(property => property.nullable === false);
    }

    get hasLength(): Property[]
    {
        return this.properties.filter(property => !!property.length);
    }

    get hasMaxLength(): Property[]
    {
        return this.properties.filter(property => !!property.maxLength);
    }

    get hasMinLength(): Property[]
    {
        return this.properties.filter(property => !!property.minLength);
    }

    get isInteger(): Property[]
    {
        return this.properties.filter(property => property.type === SqlType.INT);
    }

    get isIntegerUnsigned(): Property[]
    {
        return this.properties.filter(property => property.type === SqlType['INT.UNSIGNED']);
    }

    get isBoolean(): Property[]
    {
        return this.properties.filter(property => property.type === SqlType.BOOLEAN);
    }

    get isEnum(): Property[]
    {
        return this.properties.filter(property => property.type === SqlType.ENUM);
    }

    get isTimestamp(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))          // exclude timestamps
            .filter(property => property.type === SqlType.TIMESTAMP);
    }

    // others
    get valueObjects(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to many relations
    }

    get response(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to many relations
    }

    get seed(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                              // exclude timestamps
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get mapper(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    get mock(): Property[]
    {
        return this.properties
            .filter(property => property.relationship !== SqlRelationship.ONE_TO_MANY)                                      // exclude one to many relations
            .filter(property => !(property.relationship === SqlRelationship.ONE_TO_ONE && !property.relationshipField));    // exclude one to one relations without relationshipField, is relation one to one without xxxx_id
    }

    getForeignRelationship(boundedContextName: string): Property[]
    {
        return this.withRelationship.filter(item =>
        {
            if (!item.relationshipModulePath) return false;
            return item.relationshipModulePath.split('/')[0] !== boundedContextName
        });
    }

    add(property: Property): void
    {
        this.properties.push(property);
    }

    filter(fn: ()=>{}): Property[]
    {
        return this.properties.filter(fn);
    }

    toDto(): Property[]
    {
        return this.properties.map(property => property.toDto());
    }
}