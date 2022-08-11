import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import ResetCss from "../styles/resetCss";
import GlobalStyle from "../styles/globalStyles";
import UserProvider from "../contexts/UserContext.jsx";
import Home from "./../pages/Home.jsx";
import Statistic from "./../pages/Statistic.jsx";
import Ranking from "./../pages/Ranking.jsx";
import Shop from "./../pages/Shop.jsx";

export default function App() {
    return (
        <>
            <ResetCss />
            <GlobalStyle />
            <Container>
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/estatisticas"
                                element={<Statistic />}
                            />
                            <Route path="/ranking" element={<Ranking />} />
                            <Route path="/shop" element={<Shop />} />
                        </Routes>
                    </BrowserRouter>
                </UserProvider>
            </Container>
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
`;
