import React from "react";
import { Word } from "../../data/structures/word";
import { FilterBarProps } from "./filter_bar";

export const useFilterChangeNotifications: (
    resultsPayload: {
        results: Word[];
        resultsHash: string;
        onResultsChanged: FilterBarProps["onResultsChanged"];
    },
    meaningPayload: {
        checked: boolean;
        onHideMeaningChanged: FilterBarProps["onHideMeaningChanged"];
    },
    pinyinPayload: {
        checked: boolean;
        onHidePinYinChanged: FilterBarProps["onHidePinYinChanged"];
    }
) => void = (resultsPayload, meaning, pinyin) => {
    const { onResultsChanged, results, resultsHash } = resultsPayload;
    React.useEffect(
        () => {
            onResultsChanged(results);
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [resultsHash]
    );
    React.useEffect(
        () => {
            meaning.onHideMeaningChanged(meaning.checked);
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [meaning.checked]
    );
    React.useEffect(
        () => {
            pinyin.onHidePinYinChanged(pinyin.checked);
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [pinyin.checked]
    );
};
