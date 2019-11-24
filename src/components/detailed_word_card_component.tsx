import * as React from 'react';
import { Word } from '../data/structures/word';
import { joinify } from '../utils/joinify';
import { canSpeechSynthesify, speechSynthesify } from '../utils/speech_synthesify';
import { LoudspeakerIconComponent } from './loudspeaker_icon_component';
import { WordCardComponent } from './word_card_component';

export interface DetailedWordCardComponentProps {
	word: Word;
	id: string;
	onSubCharacterClick: (id: string) => void;
}

export function DetailedWordCardComponent(props: DetailedWordCardComponentProps): JSX.Element {
	const { word, onSubCharacterClick } = props;
	const { characters, meaning, remarks } = word;
	const logogram = characters.map((c) => c.logogram).join('');

	function renderWordDetails(): JSX.Element {
		return (
			<React.Fragment>
				<div className="detailed-word-word">{logogram}</div>
				<div className="detailed-word-pinyin">{characters.map((c) => c.pinyin)}</div>
				{meaning && (
					<div className="detailed-word-meaning">
						<strong>Meaning: </strong>
						{joinify(meaning)}
					</div>
				)}
				{remarks && (
					<div className="detailed-word-remarks">
						<strong>Remarks: </strong>
						{joinify(remarks)}
					</div>
				)}
			</React.Fragment>
		);
	}

	function isMultiCharacterWord(): boolean {
		return characters.length > 1;
	}

	function renderCharactersInformation(): JSX.Element {
		return (
			<div className="words">
				{characters.map((c, index) => (
					<WordCardComponent
						id={c.id}
						onClick={onSubCharacterClick}
						characters={[ c ]}
						meaning={c.meaning}
						remarks={c.remarks}
						key={c.id + index + word.id}
						hideMeaning={false}
						hidePinYin={false}
					/>
				))}
			</div>
		);
	}

	return (
		<React.Fragment>
			<div className={`word detailed ${isMultiCharacterWord() ? 'multi-character' : ''}`}>
				{canSpeechSynthesify() && (
					<LoudspeakerIconComponent
						onClick={() => {
							speechSynthesify(logogram);
						}}
					/>
				)}
				{renderWordDetails()}
			</div>
			{isMultiCharacterWord() && renderCharactersInformation()}
		</React.Fragment>
	);
}
