import { Construct } from './construct';

export interface Character extends Construct {
	logogram: string;
	pinyin: string;
}
