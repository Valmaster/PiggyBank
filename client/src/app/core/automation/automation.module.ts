import {NgModule} from '@angular/core';
import {AutomationService} from 'core/automation/automation.service';

@NgModule({
    providers: [AutomationService],
})
export class AutomationModule{
    constructor(private automationService: AutomationService) {}
}
