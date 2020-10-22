/**
 * Holds all model classes.
 * 
 * each class we have here should line up with an object on the java side 
 */

import { LanguageTypeEnum, UserAccessEnum } from './enums'; 

export interface Snippet {
    id: string;
    path: string;
    creator: User;
    comments: Comment[]; 
    info: string;
    language: LanguageTypeEnum;
    timestamp: string;
    content: string;
    password: string;
    
}

export interface ModifySnippet {
    info: string;
    language: string;
    content: string;
}

export interface Comment {
    id: string;
    timestamp: string;
    text: string;
    region: Region;
}

export interface Region {
    start: number;
    end: number;
}

export interface User {
    type: UserAccessEnum;
    name: string;
}