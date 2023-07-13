import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Pipe({
    name: 'getGridSpinnerFlag',
    standalone: true,
})
export class GetGridSpinnerFlagPipe implements PipeTransform
{
    transform(spinner: BehaviorSubject<boolean> | (() => BehaviorSubject<boolean>)): BehaviorSubject<boolean>
    {
        if (spinner instanceof Function) return spinner();
        if (spinner instanceof BehaviorSubject) return spinner;

        return undefined;
    }
}
