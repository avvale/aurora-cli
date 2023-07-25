import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerManagerService } from './spinner-manager.service';

@Pipe({
    name: 'getSpinnerFlag',
    standalone: true,
})
export class GetSpinnerFlagPipe implements PipeTransform
{
    constructor(
        private spinnerManagerService: SpinnerManagerService,
    ) {}

    transform(actionId: string): BehaviorSubject<boolean>
    {
        return this.spinnerManagerService.getSpinnerFlag(actionId);
    }
}
