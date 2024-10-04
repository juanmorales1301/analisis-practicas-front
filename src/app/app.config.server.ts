import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * Configuración del servidor
 * Este objeto configura los proveedores específicos para la renderización en el servidor.
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

/**
 * Configuración combinada de la aplicación y del servidor
 * Combina la configuración de la aplicación y la configuración del servidor en un solo objeto.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
