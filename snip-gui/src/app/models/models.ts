/**
 * Holds all model classes.
 * 
 * each class we have here should line up with an object on the java side 
 */

import { LanguageTypeEnum, UserAccessEnum } from './enums'; 
import { CommentStub } from './stubs';

export interface ISnippet extends ISnippetDto{
    isCreating: boolean;
}

export interface ISnippetDto {
    id: number;
    path: string;
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

    return  <ISnippet> {
        id: dto.id,
        comments: [
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
            new CommentStub(),
        ],
        info: dto.info,
        language: dto.language,
        timestamp: dto.timestamp,
        content: dto.content,
        password: dto.password,
        name: dto.name,
        isCreating: false,
    }
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
    start: number;
    end: number;
}