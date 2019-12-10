import * as React from "react";
import { Word } from "../data/structures/word";
import { joinify } from "../utils/joinify";
import { logogramify } from "../utils/logogramify";
import { pinyinify } from "../utils/pinyinify";

export interface WordCardComponentProps extends Word {
    onClick: (word: string) => void;
    id: string;
    hidePinYin: boolean;
    hideMeaning: boolean;
}

export function WordCardComponent(props: WordCardComponentProps): JSX.Element {
    const { onClick, hideMeaning, hidePinYin, meaning } = props;

    return (
        <div
            className="word"
            onClick={() => {
                onClick(props.id);
            }}
        >
            <div className="characters">{logogramify(props)}</div>
            {!hidePinYin && <div>{pinyinify(props)}</div>}
            {!hideMeaning && <div className="word-meaning">{joinify(meaning)}</div>}
        </div>
    );
}
