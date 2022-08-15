import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header.jsx";
import Input from "../components/resources/Input.jsx";
import ball from "./../assets/ball.jpg";
import { useUser } from "../contexts/UserContext";

export default function Authentication() {
    const [emailSignin, setEmailSignin] = useState("");
    const [passwordSignin, setPasswordSignin] = useState("");
    const [emailSignup, setEmailSignup] = useState("");
    const [usernameSignup, usernameSignupSignup] = useState("");
    const [passwordSignup, setPasswordSignup] = useState("");
    const [passwordConfirmation, passwordConfirmationSignup] = useState("");
    const [createdEmail, setCreatedEmail] = useState("");
    const margin = "10px 0 5px 0";
    const [warnings, setWarnings] = useState({
        emailSignin: "",
        passwordSignin: "",
        emailSignup: "",
        username: "",
        passwordSignup: "",
        passwordconfirmation: "",
    });
    const { userInfo, setUserInfo } = useUser();
    const navigate = useNavigate();

    const verifyInputs = (type) => {
        const newWarnings = {
            emailSignin: "",
            passwordSignin: "",
            emailSignup: "",
            username: "",
            passwordSignup: "",
            passwordconfirmation: "",
        };
        let permission = true;

        if (type === "signIn") {
            if (!emailSignin) {
                newWarnings.emailSignin = "Insira o email!";
                permission = false;
            }
            if (!passwordSignin) {
                newWarnings.passwordSignin = "Insira a senha!";
                permission = false;
            }
        } else {
            if (!emailSignup) {
                newWarnings.emailSignup = "Insira o email!";
                permission = false;
            }
            if (!usernameSignup) {
                newWarnings.username = "Insira o usuário!";
                permission = false;
            }
            if (!passwordSignup) {
                newWarnings.passwordSignup = "Insira a senha!";
                permission = false;
            } else if (passwordSignup.length < 6) {
                newWarnings.passwordSignup =
                    "A senha deve ter no mínimo 6 caracteres!";
                permission = false;
            }
            if (!passwordConfirmation) {
                newWarnings.passwordconfirmation = "Repita a senha!";
                permission = false;
            }
            if (passwordSignup !== passwordConfirmation) {
                newWarnings.passwordconfirmation = "Senhas diferentes!";
                permission = false;
            }
        }

        setWarnings(newWarnings);
        return permission;
    };

    const setError = (error, type) => {
        const status = error.response.status;
        const newWarnings = {
            emailSignin: "",
            passwordSignin: "",
            emailSignup: "",
            username: "",
            passwordSignup: "",
            passwordconfirmation: "",
        };
        if (type === "signIn") {
            switch (status) {
                case 401:
                    newWarnings.passwordSignin = "Senha incorreto!";
                    break;

                case 404:
                    newWarnings.emailSignin = "Email não cadastrado!";
                    break;

                default:
                    break;
            }
        } else {
            switch (status) {
                case 409:
                    if (error.response.data === "username exist") {
                        newWarnings.username = "Usuário já existente!";
                    } else {
                        newWarnings.emailSignup = "Email já existente!";
                    }
                    break;

                default:
                    break;
            }
        }
        setWarnings(newWarnings);
    };

    useEffect(() => {
        const verifyLogin = async () => {
            const infoSerializado = localStorage.getItem("userInfo");
            if (infoSerializado) {
                const user = JSON.parse(infoSerializado);
                setUserInfo(user);
                navigate("/");
            } else {
                localStorage.removeItem("userInfo");
                setUserInfo({});
            }
        };
        verifyLogin();
    }, []);

    const signin = async () => {
        const URL = "http://localhost:4000/signin";
        const obj = { email: emailSignin, password: passwordSignin };
        try {
            const response = await axios.post(URL, obj);
            const { username, token } = response.data;
            setUserInfo({ username, token });
            localStorage.setItem(
                "userInfo",
                JSON.stringify({ username, token })
            );
            navigate("/");
        } catch (err) {
            setError(err, "signIn");
        }
    };

    const signup = async () => {
        const URL = "http://localhost:4000/signup";
        const obj = {
            email: emailSignup,
            username: usernameSignup,
            password: passwordSignup,
        };
        try {
            await axios.post(URL, obj);
            setEmailSignup("");
            usernameSignupSignup("");
            setPasswordSignup("");
            passwordConfirmationSignup("");
            setCreatedEmail("Registrado com sucesso, efetue login ao lado!");
        } catch (err) {
            setError(err, "signUp");
        }
    };

    return (
        <Container>
            <Header />
            <main>
                <Signin className="glass">
                    <h1>Entrar</h1>
                    <h3>Email</h3>
                    <Input
                        id="emailSignin"
                        value={emailSignin}
                        setValue={setEmailSignin}
                        placeholder="Insira seu email"
                        margin={margin}
                    />
                    <p>{warnings.emailSignin}</p>
                    <h3>Senha</h3>
                    <Input
                        id="passwordSignin"
                        value={passwordSignin}
                        setValue={setPasswordSignin}
                        placeholder="Insira sua senha"
                        margin={margin}
                        type="password"
                    />
                    <p>{warnings.passwordSignin}</p>
                    <button
                        onClick={async () => {
                            if (verifyInputs("signIn")) {
                                await signin();
                            }
                        }}
                    >
                        Entrar
                    </button>
                </Signin>
                <Signup className="glass">
                    <h1>Cadastrar</h1>
                    <h3>Email</h3>
                    <Input
                        id="emailSignup"
                        value={emailSignup}
                        setValue={setEmailSignup}
                        placeholder="Insira seu email"
                        margin={margin}
                    />
                    <p>{warnings.emailSignup}</p>
                    <h3>Usuário</h3>
                    <Input
                        id="username"
                        value={usernameSignup}
                        setValue={usernameSignupSignup}
                        placeholder="Insira seu usuário"
                        margin={margin}
                    />
                    <p>{warnings.username}</p>
                    <h3>Senha</h3>
                    <Input
                        id="passwordSignup"
                        value={passwordSignup}
                        setValue={setPasswordSignup}
                        placeholder="Insira sua senha"
                        margin={margin}
                        type="password"
                    />
                    <p>{warnings.passwordSignup}</p>
                    <h3>Confirmar Senha</h3>
                    <Input
                        id="passwordconfirmation"
                        value={passwordConfirmation}
                        setValue={passwordConfirmationSignup}
                        placeholder="Repita sua senha"
                        margin={margin}
                        type="password"
                    />
                    <p>{warnings.passwordconfirmation}</p>
                    <button
                        onClick={() => {
                            if (verifyInputs("signUp")) {
                                signup();
                            }
                        }}
                    >
                        Registrar
                    </button>
                    <h4>{createdEmail}</h4>
                </Signup>
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

    .glass {
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(9.5px);
        -webkit-backdrop-filter: blur(9.5px);
    }

    main {
        height: 100%;
        width: 1150px;
        margin: 180px auto 20px auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: white;

        h1 {
            width: 100%;
            text-align: center;
            font-size: 35px;
            margin: 30px auto;
            color: var(--4);
            font-weight: 800;
        }

        h3 {
            font-size: 16px;
            font-weight: 800;
        }

        p {
            height: 17px;
            font-size: 14px;
            margin-bottom: 10px;
            color: var(--4);
        }

        h4 {
            width: 100%;
            text-align: center;
            font-size: 16px;
            margin: 10px auto 0 auto;
            color: var(--4);
        }

        button {
            height: 35px;
            width: 120px;
            margin: 0 auto;
            background-color: var(--3);
            color: var(--4);
            border: 1px solid var(--4);
            font-weight: 800;
        }
    }
`;

const Signin = styled.div`
    height: 100%;
    width: 48%;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Signup = styled.div`
    height: 100%;
    width: 48%;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;
