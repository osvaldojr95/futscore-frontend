import styled from "styled-components";

export default function Input(props) {
    const { value, setValue, type, placeholder, margin, id } = props;
    return (
        <Container
            id={id ?? ""}
            margin={margin}
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={(e) => {
                setValue(e.target.value);
            }}
        />
    );
}

const Container = styled.input`
    height: 33px;
    width: 100%;
    padding: 0 15px;
    margin: ${(props) => (props.margin ? props.margin : "0 0 15px 0")};
    background-color: var(--white-app);
    border: 1px solid #d4d4d4;
    font-size: 16px;
    font-weight: 400;
    color: var(--black);
    type: ${(props) => (props.type ? props.type : "name")};
`;
