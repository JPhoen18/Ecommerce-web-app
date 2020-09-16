import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
         name: 'itemfilterpipe'
      })

export class FilterItemPipe implements PipeTransform {
  //first var to transform appears to be for the resuts.
  transform( singleOrderItemArray:any[], filter: Object, indorderitem?: any, order?: any): any {
       // filter items array, items which match and return true will be
     // kept, false will be filtered out
     return singleOrderItemArray.filter(item => indorderitem.orderid == order.orderid);
    }

}
