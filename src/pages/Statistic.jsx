import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./../components/Header.jsx";
import Menu from "./../components/Menu.jsx";
import ball from "./../assets/ball.jpg";

export default function Statistic() {
    const [season, setSeason] = useState();
    const [team, setTeam] = useState();

    return (
        <Container>
            <Header />
            <main>
                <Menu setSeason={setSeason} setTeam={setTeam} />
                {team ? (
                    <Details>{"Selecione o time"}</Details>
                ) : season ? (
                    <League>
                        <h1>{season.name}</h1>
                    </League>
                ) : (
                    <Instruction>
                        {"Selecione a liga e temporada ao lado"}
                    </Instruction>
                )}
            </main>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-image: url(${ball});
    background-size: 100% 140%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    main {
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(9.5px);
        -webkit-backdrop-filter: blur(9.5px);
        height: 100%;
        width: 1150px;
        margin: 180px auto 20px auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        color: white;
    }

    img {
        height: 100px;
        width: 100px;
    }
`;

const Instruction = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 25px;
`;

const League = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const Details = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
