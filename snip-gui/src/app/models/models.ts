/**
 * Holds all model classes.
 * 
 * each class we have here should line up with an object on the java side 
 */

import { LanguageTypeEnum, UserAccessEnum } from './enums'; 

export interface ISnippet {
    id: string;
    path: string;
    comments: IComment[]; 
    info: string;
    language: LanguageTypeEnum;
    timestamp: string;
    content: string;
    //creator: User;
}

export interface IModifySnippet {
    info: string;
    language: string;
    content: string;
}

export interface IComment {
    id: string;
    timestamp: string;
    text: string;
    region: IRegion;
}

export interface IRegion {
    start: number;
    end: number;
}

export interface IUser {
    type: UserAccessEnum;
    //name: string;
    //
}