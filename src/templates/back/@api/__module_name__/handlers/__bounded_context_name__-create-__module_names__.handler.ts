{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@nestjs/common')
            (object items=(array 'AuditingMeta' 'ICommandBus') path=config.auroraCorePackage)
            (object items=(sumStrings 'Create' (toPascalCase schema.moduleNames) 'Command') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/create/create-' (toKebabCase schema.moduleNames) '.command'))
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Input' ) path='@api/graphql')
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Dto' ) path='../dto')
    )
~}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input[] | {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto[],
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
        timezone?: string,
        {{#if schema.hasAuditing}}
        auditing?: AuditingMeta,
        {{/if}}
    ): Promise<boolean>
    {
        {{#if schema.properties.hasI18n}}
        // no content-language header is required.
        {{/if}}
        await this.commandBus.dispatch(new Create{{ toPascalCase schema.moduleNames }}Command(
            payload,
            {
                timezone,
                {{#if schema.hasAuditing}}
                repositoryOptions: {
                    auditing,
                },
                {{/if}}
            },
        ));

        return true;
    }
}