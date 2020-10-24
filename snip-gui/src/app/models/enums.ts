/**
 * enums.ts
 * 
 * Define enums here...
 */

 export enum LanguageTypeEnum {
     None = "none",
     Bash = "bash",
     C = "c",
     "C++" = "cpp",
     "C#" = "csharp",
     go = "go",
     Perl = "perl",
     Python = "python",
     Java = "java",
     JavaScript = "js",
     TypeScript = "ts",
     HTML = "html"
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
