import {
    Component,
    inject,
    input,
    OnInit,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AuthenticationService } from '@aurora';

@Component({
    selector: 'au-impersonalize-warning',
    templateUrl: './impersonalize-warning.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButtonModule,
        MatTooltipModule,
        MatBadgeModule,
        MatIconModule,
    ],
})
export class ImpersonalizeWarningComponent implements OnInit
{
    tooltip = input<string>();
    private authenticationService = inject(AuthenticationService);
    private router = inject(Router);
    show: WritableSignal<boolean> = signal(false);

    ngOnInit(): void
    {
        this.show.set(this.authenticationService.isImpersonalized());
    }

    async rollbackImpersonalize(): Promise<void>
    {
        this.authenticationService.rollbackImpersonalize();
        await this.router.navigate(['/']);
        window.location.reload();
    }
}
