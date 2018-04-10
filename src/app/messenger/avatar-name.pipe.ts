import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'avatarName'})
export class AvatarNamePipe implements PipeTransform {
  transform(input: string): string {
    if (typeof input === 'string' && input.length > 0)
      return `${input.substr(0, 1)}`;
    else
      return '?';
  }
}
