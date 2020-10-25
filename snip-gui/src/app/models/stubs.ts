import { LanguageTypeEnum } from './enums';
import { IComment, IRegion, ISnippet } from './models';

export class SnippetStub implements ISnippet
{
    id: string;
    path: string;
    comments: IComment[];
    info: string;
    language: LanguageTypeEnum;
    timestamp: string;
    content: string;
    name: string;

    constructor()
    {
        this.id = "1234";
        this.path = "/api/v1/snippet/1234";
        this.name = "Carly Creator"
        this.comments = [
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
        ]
        this.info = "This is an example snippet";
        this.timestamp = Date().toLocaleLowerCase();
        this.language = LanguageTypeEnum.Java;
        this.content = "public static void main(String[] args) {\n\tSystem.out.println(\"Hello, World!\");\n}"
    }
    
}

export class CommentStub implements IComment
{
    id: string;
    timestamp: string;
    text: string;
    region: IRegion;
    name: string

    constructor()
    {
        this.id = "1234";
        this.timestamp = Date().toLocaleLowerCase();
        this.name = "Joe User"
        this.text = "Nice job!\nLots of good stuff here";
        this.region = {
            start: 0,
            end: 5
        };
    }
    
}