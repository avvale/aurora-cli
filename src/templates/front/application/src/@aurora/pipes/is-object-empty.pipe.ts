import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isObjectEmpty',
    pure: true,
    standalone: true,
})
export class IsObjectEmptyPipe implements PipeTransform
{
    // eslint-disable-next-line @typescript-eslint/ban-types
    transform(object: Object): boolean
    {
        return object // 👈 null and undefined check
            && Object.keys(object).length === 0
            && Object.getPrototypeOf(object) === Object.prototype;
    }
}
