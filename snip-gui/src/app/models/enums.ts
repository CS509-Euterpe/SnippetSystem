/**
 * enums.ts
 * 
 * Define enums here...
 */

 export enum LanguageTypeEnum {
     None,
     Bash,
     C,
     CPlusPlus,
     CSharp,
     go,
     Perl,
     Python,
     Java,
     JavaScript,
     TypeScript,
     HTML
 }

 export namespace LanguageTypeEnum {
     export function values() {
         return Object.keys(LanguageTypeEnum).filter(
             (type) => isNaN(<any>type) && type !== 'values'
         );
     }
 }

 export enum UserAccessEnum {
     None,
     Viewer,
     Creator,
     Admin
 }
