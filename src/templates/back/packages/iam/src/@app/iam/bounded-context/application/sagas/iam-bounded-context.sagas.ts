import { IamCreatedBoundedContextEvent } from '@app/iam/bounded-context';
import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class IamBoundedContextSagas
{
    /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> =>
    {
        return events$
            .pipe(
                ofType(CreatedBoundedContextEvent),
                delay(1000),
                map(event => {
                    console.log('Inside [HeroesGameSagas] Saga');
                    return 'command';
                }),
            );
    } */
}
