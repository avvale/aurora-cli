import { SqlRelationship, SqlType, SqlIndex } from './../types';
import { cliterConfig } from './../config/cliter.config';
import * as faker from 'faker';
import * as _ from 'lodash';

export class Property
{
    [index: string]: any;   // Avoid error: Element implicitly has an 'any' type because expression of type
                            // 'string' can't be used to index type 'Property'. No index signature with a
                            // parameter of type 'string' was found on type 'Property'.ts(7053)
    public config       = cliterConfig;
    public id: string   = faker.datatype.uuid();
    private _name: string;
    public type: SqlType;
    public primaryKey?: boolean;
    private _enumOptions?: string;
    public decimals?: number[];
    public length?: number;
    public minLength?: number;
    public maxLength?: number;
    public nullable?: boolean;
    public defaultValue?: string | number;
    public relationship?: SqlRelationship;
    public relationshipSingularName?: string;
    public relationshipAggregate?: string;
    public relationshipModulePath?: string;
    public relationshipKey?: string;
    public relationshipField?: string;
    public intermediateTable?: string;
    public intermediateModel?: string;
    public intermediateModelModuleSection?: string;
    public intermediateModelFile?: string;
    public index?: SqlIndex;
    public example?: any;
    public faker?: string;

    constructor(
        payload: {
            name: string,
            type: SqlType,
            primaryKey?: boolean,
            enumOptions?: string,
            decimals?: number[],
            length?: number,
            minLength?: number,
            maxLength?: number,
            nullable?: boolean,
            defaultValue?: string | number,
            relationship?: SqlRelationship,
            relationshipSingularName?: string,
            relationshipAggregate?: string,
            relationshipModulePath?: string,
            relationshipKey?: string,
            relationshipField?: string,
            intermediateTable?: string,
            intermediateModel?: string,
            intermediateModelModuleSection?: string,
            intermediateModelFile?: string,
            index?: SqlIndex,
            example?: any,
            faker?: any,
        }
    )
    {
        this._name = payload.name;
        this.type = payload.type;
        this.primaryKey = payload.primaryKey;
        this._enumOptions = payload.enumOptions;
        this.decimals = payload.decimals;
        this.length = payload.length;
        this.minLength = payload.minLength;
        this.maxLength = payload.maxLength;
        this.nullable = payload.nullable;
        this.defaultValue = payload.defaultValue;
        this.relationship = payload.relationship;
        this.relationshipSingularName = payload.relationshipSingularName;
        this.relationshipAggregate = payload.relationshipAggregate;
        this.relationshipModulePath = payload.relationshipModulePath;
        this.relationshipKey = payload.relationshipKey;
        this.relationshipField = payload.relationshipField;
        this.intermediateTable = payload.intermediateTable;
        this.intermediateModel = payload.intermediateModel;
        this.intermediateModelModuleSection = payload.intermediateModelModuleSection;
        this.intermediateModelFile = payload.intermediateModelFile;
        this.index = payload.index;
        this.example = payload.example;
        this.faker = payload.faker;

        if (
            (
                this.type === SqlType.VARCHAR ||
                this.type === SqlType.INT ||
                this.type === SqlType['INT.UNSIGNED'] ||
                this.type === SqlType.SMALLINT ||
                this.type === SqlType['SMALLINT.UNSIGNED']
            ) &&
            typeof this.length == 'number' && typeof this.maxLength !== 'number'
        )
        {
            this.maxLength  = this.length;
            this.length     = undefined;
        }

        if (this.type === SqlType.DECIMAL)
        {
            // set maxLength to validate in value object
            this.maxLength = <number>_.head(this.decimals);
        }
    }

    // handlebars functions
    get hasTimezone(): boolean
    {
        return this.type === SqlType.TIMESTAMP;
    }

    get hasColumnDecorator(): boolean
    {
        return this.relationship !== SqlRelationship.ONE_TO_MANY && this.relationship !== SqlRelationship.MANY_TO_MANY && !(this.relationship === SqlRelationship.ONE_TO_ONE && !this.relationshipField);
    }

    get hasHasOneDecorator(): boolean
    {
        return this.relationship === SqlRelationship.ONE_TO_ONE && !this.relationshipField;
    }

    get hasBelongsToDecorator(): boolean
    {
        return  (this.relationship === SqlRelationship.MANY_TO_ONE && !!this.relationshipField) ||
                (this.relationship === SqlRelationship.ONE_TO_ONE && !!this.relationshipField);
    }

    get hasHasManyDecorator(): boolean
    {
        return this.relationship === SqlRelationship.ONE_TO_MANY;
    }

    get hasBelongsToManyDecorator(): boolean
    {
        return this.relationship === SqlRelationship.MANY_TO_MANY;
    }

    get getDefaultValue(): any
    {
        return typeof this.defaultValue === 'boolean' || typeof this.defaultValue === 'number' ? this.defaultValue :  `'${this.defaultValue}'`;
    }

    get getReferenceKey(): any
    {
        return this.relationshipKey ? this.relationshipKey : 'id'
    }

    // property names
    get nativeName(): string
    {
        return this._name;
    }

    get name(): string
    {
        // properties that represent many to many relationships, are arrays of ids
        if (this.relationship === SqlRelationship.MANY_TO_MANY) return `${this.relationshipSingularName}Ids`;
        return this._name;
    }

    get enumOptionsArrayItems(): string | undefined
    {
        return this.enumOptions?.map(item => '\'' + item + '\'').join();
    }

    get enumOptions(): string[] | undefined
    {
        return typeof this._enumOptions === 'string' ? this._enumOptions.split(',').map(item => item.trim().toUpperCase()) : undefined;
    }

    // morph properties
    get nameGraphqlType(): string
    {
        if (this.relationship === SqlRelationship.MANY_TO_ONE && this.relationshipField) return this.relationshipField;
        if (this.relationship === SqlRelationship.ONE_TO_ONE && this.relationshipField) return this.relationshipField;
        return this._name;
    }

    get getRelationshipBoundedContext(): string | null
    {
        if (this.relationshipModulePath) return this.parseModuleSection(this.relationshipModulePath).boundedContextName;
        return null;
    }

    get getRelationshipModule(): string | null
    {
        if (this.relationshipModulePath) return this.parseModuleSection(this.relationshipModulePath).moduleName;
        return null;
    }

    get getApiType(): string
    {
        if (this.relationship === SqlRelationship.MANY_TO_MANY) return this.config.sqlTypesEquivalenceApiTypes['manyToMany'];

        return this.config.sqlTypesEquivalenceApiTypes[this.type];
    }

    get getJavascriptType(): string
    {
        if (this.relationship === SqlRelationship.MANY_TO_MANY)    return this.config.sqlTypesEquivalenceJavascriptTypes['manyToMany'];
        if (this.type === SqlType.RELATIONSHIP)                    return `${this.relationshipAggregate}[]`;

        return this.config.sqlTypesEquivalenceJavascriptTypes[this.type];
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

    get getGraphqlType(): string | undefined
    {
        if (this.relationship === SqlRelationship.ONE_TO_MANY || this.relationship === SqlRelationship.MANY_TO_MANY)    return `[${this.relationshipAggregate}]`;
        if (this.relationship === SqlRelationship.MANY_TO_ONE)                                                          return `${this.relationshipAggregate}`;
        if (this.relationship === SqlRelationship.ONE_TO_ONE)                                                           return `${this.relationshipAggregate}`;
        return this.config.sqlTypesEquivalenceQraphqlTypes[this.type];
    }

    get getGraphqlCreateType(): string
    {
        if (this.relationship === SqlRelationship.MANY_TO_MANY)                                                    return this.config.sqlTypesEquivalenceQraphqlTypes['manyToMany'];
        if (this.relationship === SqlRelationship.ONE_TO_ONE && !this.relationshipField)                           return `${this.getRelationshipBoundedContext?.toPascalCase()}Create${this.getRelationshipModule?.toPascalCase()}Input`;
        return this.config.sqlTypesEquivalenceQraphqlTypes[this.type];
    }

    get getGraphqlUpdateType(): string
    {
        if (this.relationship === SqlRelationship.MANY_TO_MANY)                                                    return this.config.sqlTypesEquivalenceQraphqlTypes['manyToMany'];
        if (this.relationship === SqlRelationship.ONE_TO_ONE && !this.relationshipField)                           return `${this.getRelationshipBoundedContext?.toPascalCase()}Update${this.getRelationshipModule?.toPascalCase()}Input`;
        return this.config.sqlTypesEquivalenceQraphqlTypes[this.type];
    }

    get hasQuotation(): boolean
    {
        return this.config.quotationTypes[this.type];
    }

    fakerPostman(force: boolean = false): any
    {
        if (this.type === SqlType.ID && !force)    return this.id;
        if (this.type === SqlType.RELATIONSHIP)    return '[]';
        if (this.type === SqlType.JSON)            return this.config.fakerRelation[this.type]().replace(/\"/gi, '\\"');
        if (this.type === SqlType.ENUM)            return this.enumOptions ? _.shuffle(this.enumOptions)[0] : null;

        return this.config.fakerRelation[this.type] ? this.config.fakerRelation[this.type](this.maxLength ? this.maxLength : this.length) : ''
    }

    private parseModuleSection(moduleSectionString: string): { boundedContextName: string, moduleName: string }
    {
        const moduleSection = moduleSectionString.split('/');
        if (moduleSection.length !== 2) throw new Error('Must input bounded context and module name, with format: bounded-context/module');

        return {
            boundedContextName: moduleSection[0],
            moduleName: moduleSection[1]
        };
    }

    toDto(): any
    {
        return {
            id: this.id,
            name: this._name,
            type: this.type,
            primaryKey: this.primaryKey,
            enumOptions: this.enumOptions,
            decimals: this.decimals,
            length: this.length,
            minLength: this.minLength,
            maxLength: this.maxLength,
            nullable: this.nullable,
            defaultValue: this.defaultValue,
            relationship: this.relationship,
            relationshipSingularName: this.relationshipSingularName,
            relationshipAggregate: this.relationshipAggregate,
            relationshipModulePath: this.relationshipModulePath,
            relationshipKey: this.relationshipKey,
            relationshipField: this.relationshipField,
            intermediateTable: this.intermediateTable,
            intermediateModel: this.intermediateModel,
            intermediateModelModuleSection: this.intermediateModelModuleSection,
            intermediateModelFile: this.intermediateModelFile,
            index: this.index,
            example: this.example,
            faker: this.faker,
        }
    }
}