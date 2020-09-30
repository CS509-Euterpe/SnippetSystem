import { ObjectUnsubscribedError } from 'rxjs';

export interface user {
    name: string;
    id: string; // UUID

}

export interface snippet {
    owner: user;
    snippet: string;
}