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


  export const LanguageMimeStrings: Map<LanguageTypeEnum, string> = new Map([
      [LanguageTypeEnum.Bash, "text/x-sh"],
      [LanguageTypeEnum.C, "text/x-csrc"],
      [LanguageTypeEnum["C#"], "text/x-csharp"],
      [LanguageTypeEnum["C++"], "text/x-c++src"],
      [LanguageTypeEnum.HTML, "application/x-ejs"],
      [LanguageTypeEnum.Java, "text/x-java"],
      [LanguageTypeEnum.JavaScript, "text/javascript"],
      [LanguageTypeEnum.None, "null"],
      [LanguageTypeEnum.Perl, "text/x-perl"],
      [LanguageTypeEnum.Python, "text/x-python"],
      [LanguageTypeEnum.TypeScript, "text/typescript"],
      [LanguageTypeEnum.go, "text/x-go"]
  ]
  )