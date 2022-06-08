import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
    providedIn: 'root',
})
export class GraphQLService
{
    constructor(
        private apollo: Apollo,
    ) { }

    client(): Apollo
    {
        return this.apollo;
    }
}
