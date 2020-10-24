import { LanguageTypeEnum } from './enums';
import { IComment, ISnippet } from './models';

export class SnippetStub implements ISnippet
{
    id: string;
    path: string;
    comments: IComment[];
    info: string;
    language: LanguageTypeEnum;
    timestamp: string;
    content: string;

    constructor()
    {
        this.id = "1234";
        this.path = "/api/v1/snippet/1234";
        this.comments = []
        this.info = "This is an example snippet";
        this.timestamp = Date().toLocaleLowerCase();
        this.language = LanguageTypeEnum.Java;
        this.content = "public static void main(String[] args) {\n\tSystem.out.println(\"Hello, World!\");\n}"
    }
    
}