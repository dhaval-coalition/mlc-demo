// src/app/shared/services/breadcrumb.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
    label: string;
    url: string;
}

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    breadcrumbs: Breadcrumb[] = [];

    constructor(private router: Router) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.breadcrumbs = this.buildBreadcrumbs(this.router.routerState.snapshot.root);
        });
    }

    private buildBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
        const label = route.data['breadcrumb'];
        const path = route.routeConfig ? route.routeConfig.path : '';
    
        // Construct the next URL and ensure it's correctly prefixed
        const nextUrl = url ? `${url}/${path}` : `/${path}`;
    
        // Avoid adding an empty label breadcrumb
        if (label) {
            breadcrumbs.push({
                label: label,
                url: nextUrl || ''
            });
        }
    
        // If the route has a child, keep building breadcrumbs recursively
        if (route.firstChild) {
            return this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
        }
    
        // Add 'Home' as the first breadcrumb if it's not already present
        if (!breadcrumbs.find(breadcrumb => breadcrumb.label === 'Home')) {
            return [{ label: 'Home', url: '/' }, ...breadcrumbs];
        }
    
        return breadcrumbs;
    }
    
    
    getBreadcrumbs(): Breadcrumb[] {
        return this.breadcrumbs;
    }
}
