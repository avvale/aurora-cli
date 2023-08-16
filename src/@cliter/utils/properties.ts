import { Property } from './property';
import { ModuleDefinitionSchema, PropertyIndex, RelationshipType, PropertyType, WebComponentType } from '../types';

export class Properties
{
    schema!: ModuleDefinitionSchema;
    properties: Property[] = [];
    timestampFields: string[] = ['createdAt', 'updatedAt', 'deletedAt'];
    deletedAtField: string[] = ['deletedAt'];

    *[Symbol.iterator]()
    {
        for (const property of this.properties) yield property;
    }

    get length(): number
    {
        return this.properties.length;
    }

    get hasI18n(): boolean
    {
        return this.properties.some(property => property.isI18n);
    }

    get hasEnum(): boolean
    {
        return this.properties.some(property => property.type === PropertyType.ENUM);
    }

    /* get hasIndex(): boolean
    {
        return this.properties.some(property => (property.index === PropertyIndex.INDEX || property.index === PropertyIndex.UNIQUE) && !property.isI18n);
    } */

    get hasIndexI18n(): boolean
    {
        return this.properties.some(property => (property.index === PropertyIndex.INDEX || property.index === PropertyIndex.UNIQUE) && property.isI18n);
    }

    /* get withoutTimestamps(): Property[]
    {
        return this.properties.filter(property => !this.timestampFields.includes(property.name));
    } */

    get withoutTimestampsWithoutRelationship(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))
            .filter(property => !property.relationship);
    }

    get lengthWebComponents(): number
    {
        return this.properties.filter(property => Boolean(property.webComponent?.type)).length;
    }

    get lengthSelectElementWebComponents(): number
    {
        return this.properties.filter(property => property.webComponent?.type === WebComponentType.SELECT).length;
    }

    get lengthGridSelectElementWebComponents(): number
    {
        return this.properties.filter(property => property.webComponent?.type === WebComponentType.GRID_SELECT_ELEMENT).length;
    }

    get lengthGridElementsManagerWebComponents(): number
    {
        return this.properties.filter(property => property.webComponent?.type === WebComponentType.GRID_ELEMENTS_MANAGER).length;
    }

    get withoutDeletedAt(): Property[]
    {
        return this.properties.filter(property => !this.deletedAtField.includes(property.name));
    }

    /***************************************************
     * get relationship for import to avoid duplicates *
     ***************************************************/
    /* get withImportRelationshipOneToOne(): Property[]
    {
        return this.properties
            // avoid duplicate self relations
            .filter((value, index, self) => index === self.findIndex(t => (t.relationship?.modulePath === value.relationship?.modulePath && t.relationship?.aggregateName === value.relationship?.aggregateName)))
            .filter(property => property.relationship?.type === RelationshipType.ONE_TO_ONE);
    } */

    /* get withImportRelationshipManyToOne(): Property[]
    {
        return this.properties
            // avoid duplicate self relations
            .filter((value, index, self) => index === self.findIndex(t => (t.relationship?.modulePath === value.relationship?.modulePath && t.relationship?.aggregateName === value.relationship?.aggregateName)))
            .filter(property => property.relationship?.type === RelationshipType.MANY_TO_ONE);
    } */

    /* get withImportRelationshipOneToMany(): Property[]
    {
        return this.properties
            // avoid duplicate self relations
            .filter((value, index, self) => index === self.findIndex(t => (t.relationship?.modulePath === value.relationship?.modulePath && t.relationship?.aggregateName === value.relationship?.aggregateName)))
            .filter(property => property.relationship?.type === RelationshipType.ONE_TO_MANY);
    } */

    /*  get withImportRelationshipManyToMany(): Property[]
    {
        return this.properties
            // avoid duplicate self relations
            .filter((value, index, self) => index === self.findIndex(t => (t.relationship?.modulePath === value.relationship?.modulePath && t.relationship?.aggregateName === value.relationship?.aggregateName)))
            .filter(property => property.relationship?.type === RelationshipType.MANY_TO_MANY);
    } */

    /****************
     * RELATIONSHIP *
     ****************/
    /* get withRelationship(): Property[]
    {
        return this.properties.filter(property => Boolean(property.relationship));
    } */

    get withRelationshipOneToOne(): Property[]
    {
        return this.properties.filter(property => property.relationship?.type === RelationshipType.ONE_TO_ONE);
    }

    get withRelationshipOneToOneWithRelationshipField(): Property[]
    {
        return this.withRelationshipOneToOne.filter(property => Boolean(property.relationship?.field));
    }

    get withRelationshipOneToOneWithoutRelationshipField(): Property[]
    {
        return this.withRelationshipOneToOne.filter(property => !property.relationship?.field);
    }

    get withRelationshipManyToOne(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type === RelationshipType.MANY_TO_ONE);
    }

    get withRelationshipOneToMany(): Property[]
    {
        return this.properties.filter(property => property.relationship?.type === RelationshipType.ONE_TO_MANY);
    }

    /* get withRelationshipManyToMany(): Property[]
    {
        return this.properties.filter(property => property.relationship?.type === RelationshipType.MANY_TO_MANY);
    } */

    /* get withRelationshipType(): Property[]
    {
        return this.properties.filter(property => property.type === PropertyType.RELATIONSHIP);
    } */

    /* get withTimezone(): Property[]
    {
        return this.properties.filter(property => property.hasTimezone);
    } */

    get id(): Property | undefined
    {
        return this.properties.find(property => property.type === PropertyType.ID);
    }

    /*********
     * FRONT *
     *********/
    get gridFields(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))
            .filter(property => property.name !== 'availableLangs')
            .filter(property => property.name !== 'meta')
            .filter(property => property.name !== 'id');
    }

    get formDetailFields(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))
            .filter(property => property.name !== 'id');
    }

    get formGroupFields(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))
            .filter(property => property.name !== 'availableLangs')
            .filter(property => property.name !== 'meta');
    }

    get formGroupFieldsIsNotI18n(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))
            .filter(property => !property.isI18n)
            .filter(property => property.name !== 'availableLangs')
            .filter(property => property.name !== 'meta');
    }

    get withWebComponents(): Property[]
    {
        return this.properties
            .filter(property => Boolean(property.webComponent?.type));
    }

    get withSelectWebComponents(): Property[]
    {
        return this.properties
            .filter(property => property.webComponent?.type === WebComponentType.SELECT);
    }

    get withGridSelectElementWebComponents(): Property[]
    {
        return this.properties
            .filter(property => property.webComponent?.type === WebComponentType.GRID_SELECT_ELEMENT);
    }

    get withGridElementsManagerWebComponents(): Property[]
    {
        return this.properties
            .filter(property => property.webComponent?.type === WebComponentType.GRID_ELEMENTS_MANAGER);
    }

    /*************
     * AGGREGATE *
     *************/
    /* get aggregate(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
    } */

    /************
     * COMMANDS *
     ************/
    /* get createCommand(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                    // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
    } */

    /* get updateCommand(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                      // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                       // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field));   // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
    } */

    /* get upsertCommand(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                    // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
    } */

    /********************
     * COMMAND HANDLERS *
     ********************/
    /* get createCommandHandler(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                    // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
    } */

    /* get updateCommandHandler(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                    // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
    } */

    /* get upsertCommandHandler(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                    // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
    } */

    /********************
     * QUERY HANDLERS *
     ********************/
    /* get findQueryHandler(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY); // exclude one to many relations
    } */

    /* get findByIdQueryHandler(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY); // exclude one to many relations
    } */

    /* get getQueryHandler(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY); // exclude one to many relations
    } */

    /************
     * SERVICES *
     ************/
    /* get createService(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                          // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                           // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))        // exclude one to one relations without relationship field, is relation one to one without xxxxId
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')) // exclude relationship id of i18n table
            .filter(property => !this.hasI18n || (this.hasI18n && property.name !== 'availableLangs'));                                 // exclude availableLangs if has i18n table
    } */

    /* get createItemsService(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                           // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                            // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))         // exclude one to one relations without relationship field, is relation one to one without xxxxId
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                         // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')); // exclude relationship id of i18n table
    } */

    /* get updateService(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                          // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                           // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))        // exclude one to one relations without relationship field, is relation one to one without xxxxId
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')) // exclude relationship id of i18n table
            .filter(property => !this.hasI18n || (this.hasI18n && property.name !== 'availableLangs'));                                 // exclude availableLangs if has i18n table
    } */

    /* get upsertService(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                           // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                            // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))         // exclude one to one relations without relationship field, is relation one to one without xxxxId
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                         // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')); // exclude relationship id of i18n table
    } */

    // events
    /* get createdEvent(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    } */

    /* get updatedEvent(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    } */

    /* get deletedEvent(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship  field, is relation one to one without xxxxId
    } */

    /***************
     * CONTROLLERS *
     ***************/
    /* get createController(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                          // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                           // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))        // exclude one to one relations without relationship field, is relation one to one without xxxxId
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')) // exclude relationship id of i18n table
            .filter(property => !this.hasI18n || (this.hasI18n && property.name !== 'availableLangs'));                                 // exclude availableLangs if has i18n table
    } */

    /* get updateController(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                          // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                           // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))        // exclude one to one relations without relationship field, is relation one to one without xxxxId
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')) // exclude relationship id of i18n table
            .filter(property => !this.hasI18n || (this.hasI18n && property.name !== 'availableLangs'));                                 // exclude availableLangs if has i18n table
    } */

    // resolvers
    /* get createResolver(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                    // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    } */

    /* get updateResolver(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                    // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    } */

    /***********
     * GRAPHQL *
     ***********/
    /* get graphqlProperties(): Property[]
    {
        return this.properties;
    } */

    /* get graphqlInputProperties(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name)); // exclude timestamps
    } */

    /********
     * REST *
     ********/
    /* get dtoProperties(): Property[]
    {
        return this.properties;
    } */

    /* get dtoInputProperties(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name)); // exclude timestamps
    } */

    /**********
     * MODELS *
     **********/
    /* get modelColumns(): Property[]
    {
        return this.properties; // exclude one to many relations
    } */

    /* get schemaRelations(): Property[]
    {
        return this.properties.filter(property => Boolean(property.relationship)); // only relationship
    } */

    /* get columnsWithIndex(): Property[]
    {
        return this.properties.filter(property => property.index); // only properties with index defined
    } */

    /***********
     * POSTMAN *
     ***********/
    get postmanGraphQLCreateQuery(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                          // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                           // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                          // exclude many to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))        // exclude one to one relations without relationship field, is relation one to one without xxxxId
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')) // exclude relationship id of i18n table
            .filter(property => !this.hasI18n || (this.hasI18n && property.name !== 'availableLangs'));                                 // exclude availableLangs if has i18n table
    }

    get postmanGraphQLCreateVariables(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                          // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                           // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                          // exclude many to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))        // exclude one to one relations without relationship field, is relation one to one without xxxxId
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')) // exclude relationship id of i18n table
            .filter(property => !this.hasI18n || (this.hasI18n && property.name !== 'availableLangs'));                                 // exclude availableLangs if has i18n table
    }

    get postmanGraphQLGetQuery(): Property[]
    {
        return this.properties
            .filter(property => !this.deletedAtField.includes(property.name))                                                     // exclude deleteAt
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_ONE)                                     // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                    // exclude many to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    }

    get postmanGraphQLFindQuery(): Property[]
    {
        return this.properties
            .filter(property => !this.deletedAtField.includes(property.name))                                                     // exclude deleteAt
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_ONE)                                     // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                    // exclude many to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    }

    get postmanGraphQLFindByIdQuery(): Property[]
    {
        return this.properties
            .filter(property => !this.deletedAtField.includes(property.name))                                                     // exclude deleteAt
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_ONE)                                     // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                    // exclude many to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    }

    get postmanGraphQLUpdateQuery(): Property[]
    {
        return this.properties
            .filter(property => !this.deletedAtField.includes(property.name))                                                     // exclude deleteAt
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_ONE)                                     // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                    // exclude many to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    }

    get postmanGraphQLUpdateVariables(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                          // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                           // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))        // exclude one to one relations without relationship field, is relation one to one without xxxxId
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')) // exclude relationship id of i18n table
            .filter(property => !this.hasI18n || (this.hasI18n && property.name !== 'availableLangs'));                                 // exclude availableLangs if has i18n table
    }

    get postmanGraphQLDeleteQuery(): Property[]
    {
        return this.properties
            .filter(property => !this.deletedAtField.includes(property.name))                                                     // exclude deleteAt
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_ONE)                                     // exclude one to many relations
            .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                    // exclude many to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    }

    get postmanRestCreate(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                    // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to many relations
    }

    get postmanRestUpdate(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                    // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to many relations
    }

    /***********
     * TESTING *
     ***********/
    /* get test(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                          // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                           // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))        // exclude one to many relations
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')) // exclude relationship id of i18n table
            .filter(property => !this.hasI18n || (this.hasI18n && property.name !== 'availableLangs'));                                 // exclude availableLangs if has i18n table
    } */

    /* get isNotNullable(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties.filter(property => property.nullable === false)
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')) // exclude relationship id of i18n table
            .filter(property => !this.hasI18n || (this.hasI18n && property.name !== 'availableLangs'));                                 // exclude availableLangs if has i18n table
    } */

    /* get hasLength(): Property[]
    {
        if (!this.schema) throw new Error('Schema property is not defined');

        return this.properties.filter(property => !!property.length)
            .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
            .filter(property => !property.isI18n || (property.isI18n && property.name !== this.schema.moduleName.toCamelCase() + 'Id')) // exclude relationship id of i18n table
            .filter(property => !this.hasI18n || (this.hasI18n && property.name !== 'availableLangs'));                                 // exclude availableLangs if has i18n table
    } */

    /* get hasMaxLength(): Property[]
    {
        return this.properties.filter(property => Boolean(property.maxLength));
    } */

    /* get hasMinLength(): Property[]
    {
        return this.properties.filter(property => Boolean(property.minLength));
    } */

    /* get decimalProperties(): Property[]
    {
        return this.properties.filter(property => property.type === PropertyType.DECIMAL);
    } */

    /* get isInteger(): Property[]
    {
        return this.properties.filter(property => property.type === PropertyType.INT);
    } */

    /* get isIntegerUnsigned(): Property[]
    {
        return this.properties.filter(property => property.type === PropertyType['INT.UNSIGNED']);
    } */

    /* get isBoolean(): Property[]
    {
        return this.properties.filter(property => property.type === PropertyType.BOOLEAN);
    } */

    /* get isEnum(): Property[]
    {
        return this.properties.filter(property => property.type === PropertyType.ENUM);
    } */

    get isTimestamp(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))          // exclude timestamps
            .filter(property => property.type === PropertyType.TIMESTAMP);
    }

    /**********
     * OTHERS *
     **********/
    /* get valueObjects(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                    // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to many relations
    } */

    /* get response(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to many relations
    } */

    /* get seed(): Property[]
    {
        return this.properties
            .filter(property => !this.timestampFields.includes(property.name))                                                    // exclude timestamps
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    } */

    /* get mapper(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    } */

    /* get mock(): Property[]
    {
        return this.properties
            .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
            .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
    } */

    /* getForeignRelationship(boundedContextName: string): Property[]
    {
        return this.withRelationship.filter(item =>
        {
            if (!item.relationship?.modulePath) return false;
            return item.relationship?.modulePath.split('/')[0] !== boundedContextName;
        });
    } */

    add(property: Property): void
    {
        this.properties.push(property);
    }

    filter(fn: () => { /**/ }): Property[]
    {
        return this.properties.filter(fn);
    }

    toDto(): Property[]
    {
        return this.properties.map(property => property.toDto());
    }
}
