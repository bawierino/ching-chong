import * as React from 'react';
import { Word } from '../data/structures/word';
import { joinify } from '../utils/joinify';
import { logogramify } from '../utils/logogramify';
import { pinyinify } from '../utils/pinyinify';
import { canSpeechSynthesify, speechSynthesify } from '../utils/speech_synthesify';
import { LoudspeakerIconComponent } from './loudspeaker_icon_component';
import { WordsCardsComponent } from './word_cards_component';

export interface DetailedWordCardComponentProps {
	word: Word;
	id: string;
	onSubCharacterClick: (id: string) => void;
}

export function DetailedWordCardComponent(props: DetailedWordCardComponentProps): JSX.Element {
	const { word, onSubCharacterClick } = props;
	const { characters, meaning, remarks } = word;
	const logogram = logogramify(word);

	function renderWordDetails(): JSX.Element {
		const joinedMeaning = joinify(meaning);
		const joinedRemarks = joinify(remarks);

		return (
			<React.Fragment>
				<div className="detailed-word-word">{logogram}</div>
				<div className="detailed-word-pinyin">{pinyinify(word)}</div>
				{joinedMeaning && (
					<div className="detailed-word-meaning">
						<strong>Meaning: </strong>
						{joinedMeaning}
					</div>
				)}
				{joinedRemarks && (
					<div className="detailed-word-remarks">
						<strong>Remarks: </strong>
						{joinedRemarks}
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
				<WordsCardsComponent
					hideMeaning={false}
					hidePinYin={false}
					onClickCard={onSubCharacterClick}
					words={word.characters.map((c) => ({ ...c, characters: [ c ] }))}
				/>
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
