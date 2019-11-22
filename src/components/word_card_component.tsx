import * as React from 'react';
import { Word } from '../data/structures/word';
import { joinify } from '../utils/joinify';

export interface WordCardComponentProps extends Word {
	onClick: (word: string) => void;
	id: string;
	hidePinYin: boolean;
	hideMeaning: boolean;
}

export function WordCardComponent(props: WordCardComponentProps): JSX.Element {
	const { characters, onClick, hideMeaning, hidePinYin } = props;

	return (
		<div
			className="word"
			onClick={() => {
				onClick(props.id);
			}}
		>
			<div className="characters">
				{characters.map((c) => (
					<div key={c.id} className="character">
						{c.logogram}
					</div>
				))}
			</div>
			{!hidePinYin && <div>{characters.map((character) => character.pinyin)}</div>}
			{!hideMeaning && <div className="word-meaning">{joinify(props.meaning)}</div>}
		</div>
	);
}
