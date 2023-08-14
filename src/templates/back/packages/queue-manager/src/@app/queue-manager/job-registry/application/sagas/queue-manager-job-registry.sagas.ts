import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { QueueManagerCreatedJobRegistryEvent } from '../events/queue-manager-created-job-registry.event';

@Injectable()
export class QueueManagerJobRegistrySagas
{
    /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> =>
    {
        return events$
            .pipe(
                ofType(CreatedJobRegistryEvent),
                delay(1000),
                map(event => {
                    console.log('Inside [HeroesGameSagas] Saga');
                    return 'command';
                }),
            );
    } */
}
