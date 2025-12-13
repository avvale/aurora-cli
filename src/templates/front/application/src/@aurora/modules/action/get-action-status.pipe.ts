import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionStatusManagerService } from './action-status-manager.service';

@Pipe({
    name: 'getActionStatus',
})
export class GetActionStatusPipe implements PipeTransform {
    constructor(
        private actionStatusManagerService: ActionStatusManagerService,
    ) {}

    transform(actionId: string): BehaviorSubject<boolean> {
        return this.actionStatusManagerService.getActionStatus(actionId);
    }
}
