import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportIssueSagas {
  /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> =>
    {
        return events$
            .pipe(
                ofType(CreatedIssueEvent),
                delay(1000),
                map(event => {
                    return 'command';
                }),
            );
    } */
}
