import styled from '@emotion/styled';
import { Grid } from '@material-ui/core';

export const StyledGrid = styled(Grid)`
    && {
        display: flex;
        flex-basis: auto;
        flex-direction: column;
        background-color: #f2f2f2;
        margin: 30px;
        font-family: Open Sans;
        align-items: center;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
        justify-content: center;
        border-radius: 4px;
        padding-top: 14px;
        min-width: 282px;
        min-height: 162px;
        @media (max-width: 320px) {
            min-width: 215px;
        }
    }
`;

export const CollectionHeader = styled.div`
    display: flex;
    font-weight: bold;
    font-size: 20px;
    line-height: 150%;
    text-transform: uppercase;
    justify-content: center;
    padding: 0 0 10px;
    color: #673ab7;
    width: 100%;
`;

export const Settings = styled.div`
    display: flex;
    padding: 5px;
`;

export const AssessmentStyle = styled.div`
    margin-right: 22px;
    margin-left: 22px;
`;

export const CreateCollection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 600;
    background-color: #e0e0e0;
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.46px;
    padding: 8px 22px;
    font-family: Open Sans;
    text-transform: uppercase;
    min-width: 282px;
    height: 45px;
    border-radius: 4px;
    margin: 30px;
    @media (max-width: 320px) {
        min-width: 215px;
    }
`;

export const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px;
    margin-bottom: 10px;
`;
