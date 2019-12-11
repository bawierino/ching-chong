import { css } from "emotion";

export const filterBarStyle = css`
    label: filter-bar;

    position: sticky;
    top: 0px;
    background-color: #2b5baf;
    width: 100%;
    padding: 16px 12px 16px 12px;
    z-index: 3000;
    display: flex;
    justify-content: space-evenly;
    box-shadow: -6px 0 #2b5baf, 6px 0 #2b5baf, 0 7px 10px -3px rgba(0, 0, 0, 0.33);
    margin: 0px 4px;
    align-items: center;

    .filter-bar-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 700px;
        flex-wrap: wrap;
    }

    input {
        margin: 8px 0px;
        font-size: 18px;
    }
`;
