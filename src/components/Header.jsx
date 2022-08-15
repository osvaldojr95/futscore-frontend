import styled from "styled-components";
import { GoSignOut, GoSignIn } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";

export default function Header() {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useUser();

    useEffect(() => {
        const verifyLogin = async () => {
            const infoSerializado = localStorage.getItem("userInfo");
            if (infoSerializado) {
                const user = JSON.parse(infoSerializado);
                setUserInfo(user);
            } else {
                localStorage.removeItem("userInfo");
                setUserInfo({});
            }
        };
        verifyLogin();
    }, []);

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
                    navigate("/shop");
                }}
            >
                Shop
            </p>

            <div
                className="login"
                onClick={() => {
                    if (userInfo.username) {
                        setUserInfo({});
                        localStorage.removeItem("userInfo");
                    } else {
                        navigate("/auth");
                    }
                }}
            >
                {userInfo.username ? (
                    <>
                        {userInfo.username}
                        <GoSignIn className="icon" />
                    </>
                ) : (
                    <>
                        {"Entrar"}
                        <GoSignOut className="icon" />
                    </>
                )}
            </div>
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

    .login {
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 45px;
        font-size: 20px;
        font-weight: 800;
        z-index: 6;
        color: var(--4);
    }

    .icon {
        font-size: 16px;
        margin-left: 10px;
        color: white;
    }
`;

const Line = styled.div`
    position: absolute;
    background: var(--4);
    height: 3px;
    width: 100%;
    z-index: 5;
`;
