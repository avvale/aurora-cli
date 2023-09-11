import { OAuthCreatedAccessTokenEvent } from '@app/o-auth/access-token';
import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class OAuthAccessTokenSagas
{
    /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> =>
    {
        return events$
            .pipe(
                ofType(CreatedAccessTokenEvent),
                delay(1000),
                map(event => {
                    console.log('Inside [HeroesGameSagas] Saga');
                    return 'command';
                }),
            );
    } */
}
