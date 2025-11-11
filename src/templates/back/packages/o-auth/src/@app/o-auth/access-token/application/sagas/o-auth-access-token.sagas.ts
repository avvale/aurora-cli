import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthAccessTokenSagas {
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
