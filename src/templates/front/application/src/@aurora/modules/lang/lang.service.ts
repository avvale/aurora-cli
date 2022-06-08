import { Observable } from 'rxjs';
import { CommonLang } from './lang.types';

export abstract class LangService
{
    /**
    * Getter for langs
    */
    abstract get langs$(): Observable<CommonLang[]>;

    abstract get(): Observable<CommonLang[]>;
}