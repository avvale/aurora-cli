import * as faker from 'faker';
import { cliterConfig } from '../config/cliter.config';
import { ModuleDefinitionSchema, SqlIndex, RelationshipType, SqlType, PropertyWebComponent, PropertyRelationship } from '../types';
import { Properties } from './properties';
import { YamlManager } from './yaml-manager';

export class Property
{
    // Avoid error: Element implicitly has an 'any' type because expression of type
    // 'string' can't be used to index type 'Property'. No index signature with a
    // parameter of type 'string' was found on type 'Property'.ts(7053)
    [index: string]: any;

    public config       = cliterConfig;
    public id: string   = faker.datatype.uuid();
    private _name: string;
    public type: SqlType;
    public primaryKey?: boolean;
    public autoIncrement?: boolean;
    private _enumOptions?: string;
    public decimals?: number[];
    public length?: number;
    public minLength?: number;
    public maxLength?: number;
    public nullable?: boolean;
    public defaultValue?: string | number;
    public relationship?: PropertyRelationship;
    public pivotAggregateName?: string;
    public pivotPath?: string;
    public pivotFileName?: string;
    public isDenormalized?: boolean;
    public index?: SqlIndex;
    public indexName?: string;
    public isI18n?: boolean;
    public example?: any;
    public faker?: string;
    public webComponent?: PropertyWebComponent;
    public schema?: ModuleDefinitionSchema;

    constructor(
        payload: {
            name: string;
            type: SqlType;
            primaryKey?: boolean;
            autoIncrement?: boolean;
            enumOptions?: string;
            decimals?: number[];
            length?: number;
            minLength?: number;
            maxLength?: number;
            nullable?: boolean;
            defaultValue?: string | number;
            relationship?: PropertyRelationship;
            pivotAggregateName?: string;
            pivotPath?: string;
            pivotFileName?: string;
            isDenormalized?: boolean;
            index?: SqlIndex;
            indexName?: string;
            isI18n?: boolean;
            example?: any;
            faker?: any;
            webComponent?: PropertyWebComponent;
            schema?: ModuleDefinitionSchema;
        },
    )
    {
        this._name = payload.name;
        this.type = payload.type;
        this.primaryKey = payload.primaryKey;
        this.autoIncrement = payload.autoIncrement;
        this._enumOptions = payload.enumOptions;
        this.decimals = payload.decimals;
        this.length = payload.length;
        this.minLength = payload.minLength;
        this.maxLength = payload.maxLength;
        this.nullable = payload.nullable;
        this.defaultValue = payload.defaultValue;
        this.relationship = payload.relationship;
        this.pivotAggregateName = payload.pivotAggregateName;
        this.pivotPath = payload.pivotPath;
        this.pivotFileName = payload.pivotFileName;
        this.isDenormalized = payload.isDenormalized;
        this.index = payload.index;
        this.indexName = payload.indexName;
        this.isI18n = payload.isI18n;
        this.example = payload.example;
        this.faker = payload.faker;
        this.webComponent = payload.webComponent;
        this.schema = payload.schema;

        if (
            (
                this.type === SqlType.VARCHAR ||
                this.type === SqlType.TINYINT ||
                this.type === SqlType['TINYINT.UNSIGNED'] ||
                this.type === SqlType.INT ||
                this.type === SqlType['INT.UNSIGNED'] ||
                this.type === SqlType.SMALLINT ||
                this.type === SqlType['SMALLINT.UNSIGNED']
            ) &&
            typeof this.length === 'number' && typeof this.maxLength !== 'number'
        )
        {
            this.maxLength  = this.length;
            this.length     = undefined;
        }

        /*********************************************************************************
         * avoid set maxLength in decimal value object, this argument is already defined
         * example:
         *  - name: myColumn
         *   type: decimal
         *   decimals:
         *   - 11
         *   - 2
         *   nullable: false
         *********************************************************************************/
        if (this.type === SqlType.DECIMAL) this.maxLength = undefined;
    }

    // handlebars functions
    get hasTimezone(): boolean
    {
        return this.type === SqlType.TIMESTAMP;
    }

    get hasColumnDecorator(): boolean
    {
        return this.relationship?.type !== RelationshipType.ONE_TO_MANY &&
            this.relationship?.type !== RelationshipType.MANY_TO_MANY &&
            !(
                this.relationship?.type === RelationshipType.ONE_TO_ONE &&
                !this.relationship.field
            );
    }

    get hasHasOneDecorator(): boolean
    {
        return this.relationship?.type === RelationshipType.ONE_TO_ONE &&
            !this.relationship.field;
    }

    get hasBelongsToDecorator(): boolean
    {
        return  (
            this.relationship?.type === RelationshipType.MANY_TO_ONE &&
            Boolean(this.relationship.field)
        ) ||
        (
            this.relationship?.type === RelationshipType.ONE_TO_ONE &&
            Boolean(this.relationship.field)
        );
    }

    get hasHasManyDecorator(): boolean
    {
        return this.relationship?.type === RelationshipType.ONE_TO_MANY;
    }

    get hasBelongsToManyDecorator(): boolean
    {
        return this.relationship?.type === RelationshipType.MANY_TO_MANY;
    }

    get getDefaultValue(): any
    {
        return typeof this.defaultValue === 'boolean' || typeof this.defaultValue === 'number' ? this.defaultValue :  `'${this.defaultValue}'`;
    }

    get getReferenceKey(): any
    {
        return this.relationship?.key ? this.relationship?.key : 'id';
    }

    get isRelationship(): boolean
    {
        return this.type === SqlType.RELATIONSHIP;
    }

    get isBinary(): boolean
    {
        return this.type === SqlType.BLOB || this.type === SqlType.MEDIUMBLOB || this.type === SqlType.LONGBLOB;
    }

    // property names
    get originName(): string
    {
        return this._name;
    }

    get name(): string
    {
        // properties that represent many to many relationships, are arrays of ids
        if (this.relationship?.type === RelationshipType.MANY_TO_MANY) return `${this.relationship.singularName}Ids`;
        return this._name;
    }

    get enumOptionsArrayItems(): string | undefined
    {
        return this.enumOptions?.map(item => '\'' + item + '\'').join(',');
    }

    get enumOptions(): string[] | undefined
    {
        return typeof this._enumOptions === 'string' ? this._enumOptions.split(',').map(item => item.trim().toUpperCase()) : undefined;
    }

    get getRelationshipBoundedContext(): string | null
    {
        try
        {
            if (this.relationship?.modulePath) return this.parseModuleSection(this.relationship?.modulePath).boundedContextName;
        }
        catch
        {
            this.throwRelationshipEntityNorCreated();
        }

        return null;
    }

    get getRelationshipModule(): string | null
    {
        try
        {
            if (this.relationship?.modulePath) return this.parseModuleSection(this.relationship?.modulePath).moduleName;
        }
        catch
        {
            this.throwRelationshipEntityNorCreated();
        }

        return null;
    }

    get getRelationshipModules(): string | null
    {
        try
        {
            if (this.relationship?.modulePath) return this.parseModuleSection(this.relationship?.modulePath).moduleNames;
        }
        catch
        {
            this.throwRelationshipEntityNorCreated();
        }

        return null;
    }

    get getRelationshipProperties(): Properties | null
    {
        try
        {
            if (this.relationship?.modulePath) return this.parseModuleSection(this.relationship?.modulePath).properties;
        }
        catch
        {
            this.throwRelationshipEntityNorCreated();
        }

        return null;
    }

    get getRelationshipAggregateName(): string | null
    {
        try
        {
            if (this.relationship?.modulePath) return this.parseModuleSection(this.relationship?.modulePath).aggregateName;
        }
        catch
        {
            this.throwRelationshipEntityNorCreated();
        }

        return null;
    }

    get getJavascriptType(): string
    {
        if (this.relationship?.type === RelationshipType.MANY_TO_MANY)    return this.config.sqlTypesEquivalenceJavascriptTypes.manyToMany;
        if (this.type === SqlType.RELATIONSHIP)                    return `${this.relationship?.aggregate}[]`;

        return this.config.sqlTypesEquivalenceJavascriptTypes[this.type];
    }

    get getJavascriptModelType(): string
    {
        if (this.relationship?.type === RelationshipType.MANY_TO_MANY)    return this.config.sqlTypesEquivalenceJavascriptTypes.manyToMany;
        if (this.type === SqlType.RELATIONSHIP)                    return `${this.relationship?.aggregate}[]`;

        return this.config.sqlTypesEquivalenceJavascriptModelTypes[this.type];
    }

    get getSequelizeType(): string
    {
        let parameter: number | string | undefined | number[];
        if (this.type === SqlType.CHAR)    parameter = this.length;                 // parameter = length
        if (this.type === SqlType.VARCHAR) parameter = this.maxLength;              // parameter = maxLength
        if (this.type === SqlType.ENUM)    parameter = this.enumOptionsArrayItems;  // parameter = values
        if (this.type === SqlType.DECIMAL) parameter = this.decimals;               // parameter = decimals

        return cliterConfig.sqlTypesEquivalenceSequelizeTypes[this.type](parameter);
    }

    /********
     * REST *
     ********/
    get getSwaggerType(): string
    {
        return this.config.sqlTypesEquivalenceSwaggerTypes[this.type];
    }

    get getDtoType(): string
    {
        return this.config.sqlTypesEquivalenceDtoTypes[this.type];
    }

    /***********
     * GraphQL *
     ***********/
    get getGraphqlType(): string | undefined
    {
        if (this.relationship?.type === RelationshipType.ONE_TO_MANY || this.relationship?.type === RelationshipType.MANY_TO_MANY) return `[${this.relationship?.aggregate}]`;
        if (this.relationship?.type === RelationshipType.MANY_TO_ONE)                                                              return `${this.relationship?.aggregate}`;
        if (this.relationship?.type === RelationshipType.ONE_TO_ONE)                                                               return `${this.relationship?.aggregate}`;
        return this.config.sqlTypesEquivalenceQraphqlTypes[this.type];
    }

    get getGraphqlCreateType(): string
    {
        if (this.relationship?.type === RelationshipType.MANY_TO_MANY)                          return this.config.sqlTypesEquivalenceQraphqlTypes.manyToMany;
        if (this.relationship?.type === RelationshipType.ONE_TO_ONE && !this.relationship.field) return `${this.getRelationshipBoundedContext?.toPascalCase()}Create${this.getRelationshipModule?.toPascalCase()}Input`;
        return this.config.sqlTypesEquivalenceQraphqlTypes[this.type];
    }

    get getGraphqlUpdateType(): string
    {
        if (this.relationship?.type === RelationshipType.MANY_TO_MANY)                           return this.config.sqlTypesEquivalenceQraphqlTypes.manyToMany;
        if (this.relationship?.type === RelationshipType.ONE_TO_ONE && !this.relationship.field) return `${this.getRelationshipBoundedContext?.toPascalCase()}Update${this.getRelationshipModule?.toPascalCase()}Input`;
        return this.config.sqlTypesEquivalenceQraphqlTypes[this.type];
    }

    /*************
     * DASHBOARD *
     *************/
    get getColumnDataType(): string
    {
        return this.config.sqlTypesEquivalenceDashboardColumnDataTypes[this.type];
    }

    /*****************
     * Miscellaneous *
     *****************/
    get hasQuotation(): boolean
    {
        return this.config.quotationTypes[this.type];
    }

    private parseModuleSection(moduleSectionString: string): ModuleDefinitionSchema
    {
        const [boundedContextName, moduleName] = moduleSectionString.split('/');
        if (!boundedContextName || !moduleName) throw new Error('Must input bounded context and module name, with format: bounded-context/module');

        return YamlManager.loadYamlConfigFile(boundedContextName, moduleName);
    }

    toDto(): any
    {
        return {
            id                : this.id,
            name              : this._name,
            type              : this.type,
            primaryKey        : this.primaryKey,
            autoIncrement     : this.autoIncrement,
            enumOptions       : this.enumOptions,
            decimals          : this.decimals,
            length            : this.length,
            minLength         : this.minLength,
            maxLength         : this.maxLength,
            nullable          : this.nullable,
            defaultValue      : this.defaultValue,
            relationship      : this.relationship,
            pivotAggregateName: this.pivotAggregateName,
            pivotPath         : this.pivotPath,
            pivotFileName     : this.pivotFileName,
            isDenormalized    : this.isDenormalized,
            index             : this.index,
            indexName         : this.indexName,
            isI18n            : this.isI18n,
            example           : this.example,
            faker             : this.faker,
            webComponent      : this.webComponent,
        };
    }

    private throwRelationshipEntityNorCreated(): void
    {
        throw new Error(`
Getting relationship module path for ${this.name} property.
    Path: ${this.relationship?.modulePath}
    Aggregate: ${this.relationship?.aggregate}
    Relationship: ${this.relationship?.type}

For fields with relationship, you must previously create the yaml
of the related entity, you can do it manually or through the CLI
using the command:

aurora generate back module -n=${this.relationship?.modulePath}

And create related entity.

The yaml for the current entity has been created, regenerate
the module ${this.schema?.boundedContextName}/${this.schema?.moduleName} again when you have created the yaml
for the entity related ${this.relationship?.modulePath}, with the command:

aurora load back module -n=${this.schema?.boundedContextName}/${this.schema?.moduleName} -ft

`);
    }
}
