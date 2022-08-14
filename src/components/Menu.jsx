import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Menu(props) {
    const [league, setLeague] = useState();
    const { setSeason, setTeam } = props;
    const [leagues, setLeagues] = useState([]);

    useEffect(async () => {
        const URL = "http://localhost:4000/leagues";
        try {
            const response = await axios.get(URL);
            const { leagues } = response.data;
            setLeagues(leagues);
        } catch (e) {}
    }, []);

    return (
        <Container>
            <h1>Ligas</h1>
            {leagues.map((item) => {
                const seasons = item.Seasons.map((season) => {
                    return (
                        <h3
                            onClick={() => {
                                setSeason({
                                    name: `${item.name} - ${season.name}`,
                                    id: season.id,
                                });
                                setTeam(null);
                            }}
                        >
                            {season.name}
                        </h3>
                    );
                });
                return (
                    <>
                        <h2
                            onClick={() => {
                                setLeague(item.id);
                            }}
                        >
                            {item.name}
                        </h2>
                        {league === item.id ? seasons : <></>}
                    </>
                );
            })}
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 270px;
    padding: 20px 0 0 30px;
    background: rgba(0, 0, 0, 1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    h1 {
        font-size: 40px;
        color: var(--4);
        margin-left: -3px;
    }

    h2 {
        font-size: 18px;
        font-weight: 800;
        margin-top: 20px;
        color: rgb(255, 255, 255);
    }

    h3 {
        font-size: 16px;
        margin-left: 20px;
        margin-top: 5px;
        color: rgb(180, 180, 180);
    }
`;
