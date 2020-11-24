import { LanguageTypeEnum } from './enums';
import { IComment, IRegion, ISnippet } from './models';

export class SnippetStub implements ISnippet
{
    id: number;
    comments: IComment[];
    info: string;
    language: LanguageTypeEnum;
    timestamp: string;
    content: string;
    name: string;
    password: string;
    isCreating: boolean;

    constructor()
    {
        this.isCreating = false;
        this.id = 1234;
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
        this.timestamp = "10/2/112"
        this.language = LanguageTypeEnum.Java;
        this.content = "public static void main(String[] args) {\n\tSystem.out.println(\"Hello, World!\");\n}"
        this.password = "";

    }
    
}

export class BlankSnippet implements ISnippet
{
    id: number;
    path: string;
    comments: IComment[];
    info: string;
    language: LanguageTypeEnum;
    timestamp: string;
    content: string;
    name: string;
    isCreating: boolean;
    password: string;

    constructor()
    {this
        this.isCreating = true;
        this.id = 0;
        this.name = ""
        this.comments = [
        ]
        this.info = "";
        this.timestamp = null;
        this.language = LanguageTypeEnum.Java;
        this.content = "// Add your snippet here..."
        this.password = "";
        
    }
    
}

export class CommentStub implements IComment
{
    id: number;
    snippetId: number;
    timestamp: string;
    text: string;
    region: IRegion;
    name: string
    isSelected: boolean

    constructor()
    {
        this.id = 1234;
        this.snippetId = 1234;
        this.timestamp = Date().toLocaleLowerCase();
        this.name = "Joe User"
        this.text = "Nice job!\nLots of good stuff here";
        this.isSelected = false;
        this.region = {
            startLine: 0,
            startChar: 3,
            endLine: 0,
            endChar: 6,
        };
    }
    
}