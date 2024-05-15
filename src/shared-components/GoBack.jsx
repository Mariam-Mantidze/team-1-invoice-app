import styled from "styled-components";

export default function GoBack() {
  return (
    <>
      <GoBackDiv className="go-back">
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.342.886L2.114 5.114l4.228 4.228"
            stroke="#9277FF"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <p>Go Back</p>
      </GoBackDiv>
    </>
  );
}

const GoBackDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
  margin-top: 33px;

  & > p {
    color: ${(props) => props.theme.textColor};
    font-size: 15px;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: -0.25px;
  }
`;
