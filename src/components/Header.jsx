import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <Container>
            <Line />
            <p
                onClick={() => {
                    navigate("/");
                }}
            >
                Início
            </p>
            <p
                onClick={() => {
                    navigate("/estatisticas");
                }}
            >
                Estatísticas
            </p>
            <h1>FutScore</h1>
            <p
                onClick={() => {
                    navigate("/ranking");
                }}
            >
                Ranking
            </p>
            <p
                onClick={() => {
                    navigate("/shop");
                }}
            >
                Shop
            </p>
        </Container>
    );
}

const Container = styled.div`
    height: 170px;
    width: 100%;
    position: fixed;
    padding: 0 120px;
    top: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    color: white;

    h1 {
        margin-top: -15px;
        font-weight: 900;
        font-size: 80px;
        z-index: 6;
    }

    p {
        margin-top: 45px;
        font-size: 20px;
        font-weight: 800;
        z-index: 6;
    }
`;

const Line = styled.div`
    position: absolute;
    background: var(--4);
    height: 3px;
    width: 100%;
    z-index: 5;
`;
