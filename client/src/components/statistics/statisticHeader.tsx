import { Container } from '@material-ui/core';
import axios from 'axios';
import { useState, useEffect, ReactElement } from 'react';
import { StatsHeader } from './styles';

const StatisticHeader = (): ReactElement => {
    const url = '/api/statistics/header';

    const [dataCollection, setData] = useState([]);

    useEffect(() => {
        axios.get(url).then((json) => setData(json.data));
    }, []);

    const urlHistory = '/api/statistics/headerHistory';

    const [dataHistory, setHistory] = useState([]);

    useEffect(() => {
        axios.get(urlHistory).then((json) => setHistory(json.data));
    }, []);

    return (
        <Container maxWidth="xs" justify-content="center">
            {dataCollection.length > 0 ? (
                dataCollection.map((collection, index) => (
                    <StatsHeader key={index}>
                        Własne kolekcje: {collection['mycollections']}
                        <br />
                        Fiszki: {collection['myflashcards']}
                    </StatsHeader>
                ))
            ) : (
                <StatsHeader>
                    {' '}
                    Własne kolekcje: 0 <br /> Fiszki: 0
                </StatsHeader>
            )}
            {dataHistory.length > 0 ? (
                dataHistory.map((history, index) => (
                    <StatsHeader key={index}>
                        Powtórzone fiszki: {history['answers']}
                        <br />
                        Sesje: {history['session']}
                    </StatsHeader>
                ))
            ) : (
                <StatsHeader>
                    {' '}
                    Powtórzone fiszki: 0 <br /> Sesje: 0
                </StatsHeader>
            )}
        </Container>
    );
};

export default StatisticHeader;
