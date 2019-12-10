import * as React from "react";
import { Word } from "../../data/structures/word";
import { useCheckbox } from "../../hooks/use_checkbox";
import { useTextInput } from "../../hooks/use_text_input";
import { routerService } from "../../services/router_service";
import { usePageFilter } from "./use_page_filter";
import { useFilterChangeNotifications } from "./use_filter_change_notifications";

export interface FilterBarProps {
    isBackButtonMode: boolean;
    words: Word[];
    onResultsChanged: (results: Word[]) => void;
    onHidePinYinChanged: (checked: boolean) => void;
    onHideMeaningChanged: (checked: boolean) => void;
}

export function FilterBar(props: FilterBarProps): JSX.Element {
    const { isBackButtonMode, words, onResultsChanged, onHideMeaningChanged, onHidePinYinChanged } = props;

    const meaningFilterTextInput = useTextInput("");
    const pinYinFilterTextInput = useTextInput("");
    const exactPinYinCheckbox = useCheckbox(false);
    const hidePinYinCheckbox = useCheckbox(false);
    const hideMeaningCheckbox = useCheckbox(false);

    const { results, resultsHash } = usePageFilter(
        [],
        words,
        meaningFilterTextInput.value,
        pinYinFilterTextInput.value,
        exactPinYinCheckbox.checked
    );

    useFilterChangeNotifications(
        { onResultsChanged, results, resultsHash },
        { checked: hideMeaningCheckbox.checked, onHideMeaningChanged },
        { checked: hidePinYinCheckbox.checked, onHidePinYinChanged }
    );

    function canResetFilters(): boolean {
        return (
            !!meaningFilterTextInput.value ||
            !!pinYinFilterTextInput.value ||
            !!exactPinYinCheckbox.checked ||
            !!hideMeaningCheckbox.checked ||
            !!hidePinYinCheckbox.checked
        );
    }

    function resetFilters(): void {
        if (canResetFilters()) {
            meaningFilterTextInput.setValue("");
            pinYinFilterTextInput.setValue("");
            exactPinYinCheckbox.setChecked(false);
            hidePinYinCheckbox.setChecked(false);
            hideMeaningCheckbox.setChecked(false);
        }
    }

    return (
        <div className="filter-bar">
            <div className="filter-bar-content">
                {isBackButtonMode ? (
                    <button onClick={routerService.navigateBack}>←</button>
                ) : (
                    <React.Fragment>
                        {
                            <button disabled={!canResetFilters()} onClick={resetFilters}>
                                Reset filters
                            </button>
                        }
                        <input
                            placeholder="Filter by meaning"
                            onChange={meaningFilterTextInput.onChange}
                            value={meaningFilterTextInput.value}
                            type={meaningFilterTextInput.type}
                        />
                        <input
                            placeholder="Filter by pin yin"
                            onChange={pinYinFilterTextInput.onChange}
                            value={pinYinFilterTextInput.value}
                            type={pinYinFilterTextInput.type}
                        />
                        <input
                            checked={exactPinYinCheckbox.checked}
                            type={exactPinYinCheckbox.type}
                            onChange={exactPinYinCheckbox.onChange}
                            title="Enable exact pinyin filtering. Ignores tones."
                        />
                        <input
                            checked={hidePinYinCheckbox.checked}
                            type={hidePinYinCheckbox.type}
                            onChange={hidePinYinCheckbox.onChange}
                            title="Hide pinyin"
                        />
                        <input
                            checked={hideMeaningCheckbox.checked}
                            type={hideMeaningCheckbox.type}
                            onChange={hideMeaningCheckbox.onChange}
                            title="Hide meaning"
                        />
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}
