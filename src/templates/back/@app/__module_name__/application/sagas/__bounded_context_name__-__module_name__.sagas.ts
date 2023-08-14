import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event } from '../events/{{ toKebabCase schema.boundedContextName }}-created-{{ toKebabCase schema.moduleName }}.event';
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Sagas
{
    /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> =>
    {
        return events$
            .pipe(
                ofType(Created{{ toPascalCase schema.moduleName }}Event),
                delay(1000),
                map(event => {
                    console.log('Inside [HeroesGameSagas] Saga');
                    return 'command';
                }),
            );
    } */
}
