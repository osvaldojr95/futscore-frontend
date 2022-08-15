import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import Header from "./../components/Header.jsx";
import Menu from "./../components/Menu.jsx";
import ball from "./../assets/ball.jpg";

export default function Statistic() {
    const [season, setSeason] = useState(null);
    const [team, setTeam] = useState();
    const [teamList, setTeamlist] = useState([]);
    const [info, setInfo] = useState({});
    const { userInfo } = useUser();

    useEffect(() => {
        if (season) {
            const URL = `http://localhost:4000/seasons/${season.id}`;
            axios
                .get(URL)
                .then((res) => {
                    const { teams } = res.data;
                    setTeamlist(teams);
                })
                .catch((e) => {});
        }
    }, [season]);

    useEffect(() => {
        if (team) {
            const URL = `http://localhost:4000/seasons/${season.id}/team/${team.id}`;
            axios
                .get(URL)
                .then((res) => {
                    const { statistic } = res.data;
                    setInfo(statistic);
                })
                .catch((e) => {});
        } else {
            setInfo({});
        }
    }, [team]);

    return (
        <Container>
            <Header />
            <main>
                <Menu setSeason={setSeason} setTeam={setTeam} />
                {info.goals && team ? (
                    userInfo.username ? (
                        <Details>
                            <div className="top">
                                <div
                                    onClick={() => {
                                        setInfo({});
                                        setTeam(null);
                                    }}
                                    className="back"
                                >
                                    {"<"}
                                </div>
                                <img src={`/assets/shields/${team.name}.png`} />
                                <h1>{team.name}</h1>
                                <h2>{season.name}</h2>
                            </div>
                            <div className="info">
                                <div className="data">
                                    <div className="line side">
                                        <p>Médias por partida</p>
                                        <p>Casa</p>
                                        <p>Todos</p>
                                        <p>Fora</p>
                                    </div>
                                    {info.goals ? (
                                        Object.entries(info).map(
                                            (item, index) => {
                                                let property = "";

                                                switch (index) {
                                                    case 0:
                                                        property = "Gols";
                                                        break;
                                                    case 1:
                                                        property = "Chutes";
                                                        break;
                                                    case 2:
                                                        property =
                                                            "Posse de bola";
                                                        break;
                                                    case 3:
                                                        property = "Passes";
                                                        break;
                                                    case 4:
                                                        property =
                                                            "Precisão de passes";
                                                        break;
                                                    case 5:
                                                        property = "Faltas";
                                                        break;
                                                    case 6:
                                                        property =
                                                            "Cartões amarelos";
                                                        break;
                                                    case 7:
                                                        property =
                                                            "Impedimentos";
                                                        break;
                                                    case 8:
                                                        property = "Escanteios";
                                                        break;
                                                    default:
                                                        break;
                                                }

                                                return (
                                                    <div
                                                        className={`line${
                                                            index % 2 === 0
                                                                ? ""
                                                                : " gray"
                                                        }`}
                                                    >
                                                        <p className="name">
                                                            {property}
                                                        </p>
                                                        <p>
                                                            {Number(
                                                                item[1][0]
                                                            ).toFixed(2)}
                                                            {index === 2 ||
                                                            index === 4
                                                                ? ` %`
                                                                : ""}
                                                        </p>
                                                        <p>
                                                            {Number(
                                                                item[1][1]
                                                            ).toFixed(2)}
                                                            {index === 2 ||
                                                            index === 4
                                                                ? ` %`
                                                                : ""}
                                                        </p>
                                                        <p>
                                                            {Number(
                                                                item[1][2]
                                                            ).toFixed(2)}
                                                            {index === 2 ||
                                                            index === 4
                                                                ? `%`
                                                                : ""}
                                                        </p>
                                                    </div>
                                                );
                                            }
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </Details>
                    ) : (
                        <Instruction>
                            {`Entre com sua conta para ver as estatísticas do ${team.name}`}
                        </Instruction>
                    )
                ) : season ? (
                    <League>
                        <h1>{season.name}</h1>
                        <div className="teams">
                            {!teamList ? (
                                <></>
                            ) : (
                                teamList.map((item, index) => {
                                    return (
                                        <div
                                            className="team"
                                            onClick={() => {
                                                setTeam({
                                                    id: item.id,
                                                    name: item.name,
                                                });
                                            }}
                                        >
                                            <img
                                                id={index + 1}
                                                src={`/assets/shields/${item.name}.png`}
                                            />
                                            <p>{item.name}</p>
                                        </div>
                                    );
                                })
                            )}
                        </div>
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

    h1 {
        width: 100%;
        height: 40px;
        margin: 40px 0;
        text-align: center;
        font-size: 30px;
        color: white;
    }

    img {
        height: 45px;
        width: 45px;
    }

    .teams {
        height: 100%;
        width: 100%;
        padding: 0 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .team {
        height: auto;
        width: 140px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    p {
        margin-top: 10px;
    }
`;

const Details = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    img {
        height: 100px;
        width: 100px;
    }

    h1 {
        font-size: 40px;
        margin-left: 20px;
    }

    h2 {
        font-size: 20px;
        margin-left: auto;
    }

    p {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
    }

    .top {
        height: auto;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .back {
        height: 100%;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.1);
    }

    .info {
        height: auto;
        width: 100%;
        margin-top: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .data {
        height: auto;
        width: 100%;
    }

    .gray {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .line {
        height: auto;
        width: 100%;
        display: grid;
        grid-template-columns: 40% repeat(3, 20%);
    }

    .side {
        font-size: 25px;
        margin-bottom: 15px;
        color: var(--4);
    }
`;
