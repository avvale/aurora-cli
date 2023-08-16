{{
    setVar 'importsArray' (
        array
            (object items=(array 'EventsHandler' 'IEventHandler') path='@nestjs/cqrs')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Updated' (toPascalCase schema.moduleNames) 'Event')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
@EventsHandler({{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event)
export class {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}EventHandler implements IEventHandler<{{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event>
{
    handle(event: {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event): void
    {
        // console.log('{{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event: ', event);
    }
}
