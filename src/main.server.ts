import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Bootstrap function to initialize the server application
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

/**
 * Variable de importación bootstrap
 */
export default bootstrap;
