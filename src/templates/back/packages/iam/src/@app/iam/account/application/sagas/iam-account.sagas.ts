import { Injectable } from '@nestjs/common';

@Injectable()
export class IamAccountSagas {
    /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> =>
    {
        return events$
            .pipe(
                ofType(CreatedAccountEvent),
                delay(1000),
                map(event => {
                    return 'command';
                }),
            );
    } */
}
