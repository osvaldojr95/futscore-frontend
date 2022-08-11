import styled from "styled-components";
import Header from "./../components/Header.jsx";
import stadium from "./../assets/stadium.jpg";

export default function Home() {
    return (
        <Container>
            <Header />=
            {/* <main>Início</main> */}
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-image: url(${stadium});
    background-size: 100% 140%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    main {
        border: 7px solid var(--4);
        border-radius: 20px;
        height: 100%;
        width: 1150px;
        background: var(--1);
        margin: 180px auto 20px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
    }
`;
