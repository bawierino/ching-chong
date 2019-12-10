import { Character } from "./character";
import { Construct } from "./construct";

export interface Word extends Construct {
    characters: Character[];
}
