import styled from "styled-components";
import Header from "./../components/Header.jsx";
import ball from "./../assets/ball.jpg";

export default function Home() {
    return (
        <Container>
            <Header />
            <main>
                <img src={"./assets/home.png"} />
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;

        img {
            height: 500px;
            width: 800px;
        }
    }
`;
