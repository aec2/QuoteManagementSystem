import { Component } from '@angular/core';
import { StatsWidget } from './ecommerce/statswidget';
import { RecentSalesWidget } from './ecommerce/recentsaleswidget';
import { RevenueOverViewWidget } from "./ecommerce/revenueoverviewwidget";
import { SalesByCategoryWidget } from "./ecommerce/salesbycategorywidget";
import { TopProductsWidget } from "./ecommerce/topproductswidget";
import {DividerModule} from 'primeng/divider';


@Component({
    selector: 'app-ecommerce-dashboard',
    standalone: true,
    imports: [DividerModule],
    template: `
        <div class="flex flex-col">
              <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded">
    <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4">Card Title</div>
    <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.</div>
    <div style="height: 150px" class="border-2 border-dashed border-surface-200 dark:border-surface-700"></div>
  </div>
  <p-divider />
      <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded">
    <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4">Card Title</div>
    <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.</div>
    <div style="height: 150px" class="border-2 border-dashed border-surface-200 dark:border-surface-700"></div>
  </div>
  <p-divider />
      <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded">
    <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4">Card Title</div>
    <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.</div>
    <div style="height: 150px" class="border-2 border-dashed border-surface-200 dark:border-surface-700"></div>
  </div>
  <p-divider />
      <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded">
    <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4">Card Title</div>
    <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.</div>
    <div style="height: 150px" class="border-2 border-dashed border-surface-200 dark:border-surface-700"></div>
  </div>
  <p-divider />
      <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded">
    <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4">Card Title</div>
    <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.</div>
    <div style="height: 150px" class="border-2 border-dashed border-surface-200 dark:border-surface-700"></div>
  </div>
       </div> 
    `
})
export class EcommerceDashboard { }
