import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatNumber implements PipeTransform {

  transform(value: number | string, locale?: string): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(value));
  }
}