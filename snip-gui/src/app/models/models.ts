/**
 * Holds all model classes.
 * 
 * each class we have here should line up with an object on the java side 
 */

import { LanguageTypeEnum } from './enums'; 
import { CommentStub } from './stubs';

export interface ISnippet extends ISnippetDto{
    isCreating: boolean;
}

export interface ISnippetDto {
    id: number;
    comments: IComment[]; 
    info: string;
    language: LanguageTypeEnum;
    timestamp: string;
    content: string;
    password: string;
    name: string;
}

export function DtoToSnippet(dto: ISnippetDto): ISnippet {
    if (dto == null)
    {
        return null
    }

    let snippet = dto as ISnippet;
    snippet.isCreating = false;
    snippet.comments =[
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
        ];
    return snippet
}

export interface IModifySnippet {
    info: string;
    language: string;
    content: string;
    name: string;
    password: string;
    timestamp: string;
}

export interface IComment {
    id: number;
    timestamp: string;
    text: string;
    name: string;
    region: IRegion;
}

export interface IRegion {
    startLine: number;
    startChar: number;
    endLine: number
    endChar: number;
}