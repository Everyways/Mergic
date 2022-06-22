import { UserStory } from '../interfaces/UserStory.interface';

export class NewUserStory implements UserStory {
    name = "";
    id = "";
    time = new Date();
    author = "";
    type = "";
    status = "";
    src = "";
}