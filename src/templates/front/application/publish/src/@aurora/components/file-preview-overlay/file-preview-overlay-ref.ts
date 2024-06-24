import { OverlayRef } from '@angular/cdk/overlay';
import { filter, Observable, Subject, take } from 'rxjs';
import { FilePreviewOverlayComponent } from './file-preview-overlay.component';

export class FilePreviewOverlayRef
{
    componentInstance: FilePreviewOverlayComponent;
    private _beforeClose = new Subject<void>();
    private _afterClosed = new Subject<void>();

    constructor(
        private overlayRef: OverlayRef,
    )
    { }

    close(): void
    {
        // Listen for animation 'start' events
        this.componentInstance
            .animationStateChanged
            .pipe(
                filter(event => event.phaseName === 'start'),
                take(1),
            ).subscribe(() =>
            {
                this._beforeClose.next();
                this._beforeClose.complete();
                this.overlayRef.detachBackdrop();
            });

        // Listen for animation 'done' events
        this.componentInstance
            .animationStateChanged
            .pipe(
                filter(event => event.phaseName === 'done' && event.toState === 'leave'),
                take(1),
            )
            .subscribe(() =>
            {
                this.overlayRef.dispose();
                this._afterClosed.next();
                this._afterClosed.complete();

                // Make sure to also clear the reference to the
                // component instance to avoid memory leaks
                this.componentInstance = null!;
            });

        // Start exit animation
        this.componentInstance.startExitAnimation();
    }

    afterClosed(): Observable<void>
    {
        return this._afterClosed.asObservable();
    }

    beforeClose(): Observable<void>
    {
        return this._beforeClose.asObservable();
    }
}