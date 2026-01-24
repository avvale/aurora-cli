import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonAdministrativeAreaLevel3Sagas {
  /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> =>
    {
        return events$
            .pipe(
                ofType(CreatedAdministrativeAreaLevel3Event),
                delay(1000),
                map(event => {
                    console.log('Inside [HeroesGameSagas] Saga');
                    return 'command';
                }),
            );
    } */
}
