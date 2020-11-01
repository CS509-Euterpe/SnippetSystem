/**
 * enums.ts
 * 
 * Define enums here...
 */

 export enum LanguageTypeEnum {
     None = "NONE",
     Bash = "BASH",
     C = "C",
     "C++" = "CPP",
     "C#" = "CSHARP",
     go = "GO",
     Perl = "PERL",
     Python = "PYTHON",
     Java = "JAVA",
     JavaScript = "JS",
     TypeScript = "TS",
     HTML = "HTML"
 }


 export enum UserAccessEnum {
     None = "none",
     Viewer = "viewer",
     Creator = "creator",
     Admin = "admin"
 }

 export function enumSelector(definition) {
    return Object.keys(definition)
      .map(key => ({ value: definition[key], title: key}));
  }
