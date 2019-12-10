import { Word } from "../data/structures/word";
import React from "react";
import { WordCardComponent } from "./word_card_component";

export interface WordsCardsComponentProps {
    words: Word[];
    onClickCard: (id: string) => void;
    hidePinYin: boolean;
    hideMeaning: boolean;
}

export const WordsCardsComponent: (props: WordsCardsComponentProps) => JSX.Element = props => {
    const { words, onClickCard, hideMeaning, hidePinYin } = props;
    return (
        <React.Fragment>
            {words.map((word, index) => (
                <WordCardComponent
                    id={word.id}
                    onClick={onClickCard}
                    {...word}
                    key={word.id + index}
                    hidePinYin={hidePinYin}
                    hideMeaning={hideMeaning}
                />
            ))}
        </React.Fragment>
    );
};
