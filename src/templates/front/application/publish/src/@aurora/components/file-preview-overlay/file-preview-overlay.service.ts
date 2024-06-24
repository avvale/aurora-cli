import { ComponentRef, Injectable, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FilePreviewOverlayComponent } from './file-preview-overlay.component';
import { FilePreviewDialogConfig } from './file-preview-overlay.types';
import { FilePreviewOverlayRef } from './file-preview-overlay-ref';
import { DEFAULT_CONFIG, FILE_PREVIEW_DIALOG_DATA } from './file-preview-overlay.tokens';

@Injectable({
    providedIn: 'root',
})
export class FilePreviewOverlayService
{
    constructor(
        private readonly overlay: Overlay,
        private readonly location: Location,
        private readonly injector: Injector,
    ) { }

    open(config: FilePreviewDialogConfig = {}): FilePreviewOverlayRef
    {
        // Override default configuration
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };

        // Returns an OverlayRef (which is a PortalHost)
        const overlayRef = this.createOverlay(dialogConfig);

        // add close functionality to the overlay
        const dialogRef = new FilePreviewOverlayRef(overlayRef);

        const overlayComponent = this.attachDialogContainer(
            overlayRef,
            dialogConfig,
            dialogRef,
        );

        // Pass the instance of the overlay component to the remote control
        dialogRef.componentInstance = overlayComponent;

        // Subscribe to a stream that emits when the backdrop was clicked
        overlayRef.backdropClick().subscribe(_ => dialogRef.close());

        //this.location.subscribe(_ => dialogRef.close());

        return dialogRef;
    }

    private attachDialogContainer(
        overlayRef: OverlayRef,
        config: FilePreviewDialogConfig,
        dialogRef: FilePreviewOverlayRef,
    ): FilePreviewOverlayComponent
    {
        const injector = this.createInjector(config, dialogRef);

        const containerPortal = new ComponentPortal(FilePreviewOverlayComponent, null, injector);
        const containerRef: ComponentRef<FilePreviewOverlayComponent> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private createInjector(
        config: FilePreviewDialogConfig,
        dialogRef: FilePreviewOverlayRef,
    ): Injector
    {
        // Instantiate new FilePreviewOverlayInjector
        return Injector.create({
            providers: [
                { provide: FilePreviewOverlayRef, useValue: dialogRef },
                { provide: FILE_PREVIEW_DIALOG_DATA, useValue: config.image },
            ],
            parent: this.injector,
            name  : 'FilePreviewOverlayInjector',
        });
    }

    private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig
    {
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop   : config.hasBackdrop,
            backdropClass : config.backdropClass,
            panelClass    : config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy,
        });

        return overlayConfig;
    }

    private createOverlay(config: FilePreviewDialogConfig): OverlayRef
    {
        // Returns an OverlayConfig
        const overlayConfig = this.getOverlayConfig(config);

        // Returns an OverlayRef
        return this.overlay.create(overlayConfig);
    }
}