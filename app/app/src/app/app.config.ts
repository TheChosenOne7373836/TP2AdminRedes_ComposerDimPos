import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync()]
};

import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';





    /*
    // Create a post http request (post/add product data to server)
    addProduct(context: any) {
        return this.http.post(`$this.http_product_url`, JSON.stringify(context))
            .map((response: Response) => response.json());
    }
    // Create a put http request (put/update product data to server)
    updateProduct(id:number, context: any) {
        return this.http.put(`$this.http_product_url/${id}`, JSON.stringify(context))
            .map((response: Response) => response.json());
    }
    // Create a delete http request (delete product to server)
    deleteProduct(id: number) {
        return this.http.delete(`$this.http_product_url/${id}`)
            .map((response: Response) => response.json());
    }
    */



