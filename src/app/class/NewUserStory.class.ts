import { IUserStory } from '../interfaces/IUserStory.interface';

export class NewUserStory implements IUserStory {
    name = "";
    id = "";
    time = new Date();
    author = "";
    type = "";
    status = "";
    src = "";
}