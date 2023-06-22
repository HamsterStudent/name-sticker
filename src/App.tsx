import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SelectWrap = styled.div`
  padding: 10px;
  display: inline-block;
  .active {
    background-color: #252525;
    color: white;
  }
  button {
    padding: 5px 15px;
    border-radius: 20px;
    border: 0;
    margin-right: 5px;
  }
`;
const Sticker = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  div {
    height: 100%;
    position: absolute;
  }
  img {
    height: 100%;
    object-fit: contain;
  }
`;
const MiniSticker = styled(Sticker)`
  width: 90px;
  height: 35px;
  margin-bottom: 5px;
`;
const BasicSticker = styled(Sticker)`
  width: 49%;
  height: 55px;
  margin-bottom: 5px;
`;
const LargeSticker = styled(Sticker)`
  width: 32%;
  height: 55px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
`;
const StickerWrap = styled.section<{ fontStyle: string }>`
  width: 400px;
  padding: 5px;
  border: solid 0.7px;
  form {
    display: flex;
    justify-content: space-between;
  }
  input {
    display: inline-block;
    background-color: transparent;
    border: 0;
    border: dotted 1px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: ${(props) => `${props.fontStyle}`};
  }
  input:focus {
    outline: none;
    border: solid 1px green;
  }
  :last-child {
    margin-right: 0;
  }
  ${MiniSticker} {
    input {
      font-size: ${(props) =>
        props.fontStyle === "Single Day"
          ? "16px"
          : props.fontStyle === "Do Hyeon"
          ? "16px"
          : props.fontStyle === "Nanum Pen Script"
          ? "20px"
          : "14px"};
    }
  }
  ${BasicSticker} {
    input {
      font-size: ${(props) =>
        props.fontStyle === "Single Day"
          ? "20px"
          : props.fontStyle === "Do Hyeon"
          ? "20px"
          : props.fontStyle === "Nanum Pen Script"
          ? "26px"
          : "16px"};
    }
  }
  ${LargeSticker} {
    input {
      font-size: ${(props) =>
        props.fontStyle === "Single Day"
          ? "20px"
          : props.fontStyle === "Do Hyeon"
          ? "20px"
          : props.fontStyle === "Nanum Pen Script"
          ? "26px"
          : "16px"};
    }
  }
`;

const StickerColumn = styled.section`
  margin-right: 1.5%;
`;
const StickerInnerWrap = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function App() {
  const [active, setActive] = useState("");
  const [basicImgs, setBasicImgs] = useState<Array<string>>([]);
  const [miniImgs, setMiniImgs] = useState<Array<string>>([]);
  const [largeImgs, setLargeImgs] = useState<Array<string>>([]);
  const [customUrl, setCustomUrl] = useState("");
  const [inputValue, setInputValue] = useState(
    JSON.parse(sessionStorage.getItem("inputValue") || "{}"),
  );
  const [selectedFont, setSeletedFont] = useState("");

  useEffect(() => {
    window.sessionStorage.setItem("inputValue", JSON.stringify(inputValue));
  }, [inputValue]);

  useEffect(() => {
    makeArr("mini", 13);
    makeArr("basic", 14);
    makeArr("large", 6);
  }, []);

  const makeArr = (size: string, num: number) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(`${size}${i}`);
    }
    size === "mini"
      ? setMiniImgs([...arr])
      : size === "basic"
      ? setBasicImgs([...arr])
      : setLargeImgs([...arr]);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget);
  };
  const onBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    if (name === "mm") {
      setCustomUrl("mm");
    } else if (name === "ku") {
      setCustomUrl("ku");
    } else if (name === "pn") {
      setCustomUrl("pn");
    }
    setActive(name);
  };
  const onchange = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setInputValue({ ...inputValue, [name]: value });
    console.log(inputValue);
  };

  const seleteFont = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setSeletedFont(value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.sessionStorage.setItem("inputValue", JSON.stringify(inputValue));
  };
  return (
    <div className="App">
      <SelectWrap>
        <button
          onClick={onBtnClick}
          name="mm"
          className={active === "mm" ? "active" : undefined}
        >
          MM
        </button>
        <button
          onClick={onBtnClick}
          name="ku"
          className={active === "ku" ? "active" : undefined}
        >
          KU
        </button>
        <button
          onClick={onBtnClick}
          name="pn"
          className={active === "pn" ? "active" : undefined}
        >
          PN
        </button>
        <select onChange={seleteFont}>
          <option value="">--Please choose an font--</option>
          <option value="NeoDunggeunmo">둥근모꼴</option>
          <option value="Do Hyeon">도현체</option>
          <option value="Single Day">싱글 데이</option>
          <option value="Nanum Pen Script">나눔 펜 스크립트</option>
        </select>
      </SelectWrap>

      <StickerWrap fontStyle={selectedFont}>
        <form onChange={onchange}>
          <StickerColumn>
            {miniImgs.map((name, index) => (
              <MiniSticker key={index} onClick={onClick}>
                <div>
                  <img
                    src={`../images/${customUrl}/${customUrl}_mini_${index}.png`}
                    alt=""
                  />
                </div>
                <input
                  type="text"
                  name={name}
                  value={inputValue[`${name}`] || ""}
                  onChange={() => {}}
                />
              </MiniSticker>
            ))}
          </StickerColumn>
          <StickerColumn>
            <StickerInnerWrap>
              {basicImgs.map((name, index) => (
                <BasicSticker key={index} onClick={onClick}>
                  <div>
                    <img
                      src={`../images/${customUrl}/${customUrl}_basic_${index}.png`}
                      alt=""
                    />
                  </div>
                  <input
                    type="text"
                    name={name}
                    value={inputValue[`${name}`] || ""}
                    onChange={() => {}}
                  />
                </BasicSticker>
              ))}
            </StickerInnerWrap>
            <StickerInnerWrap>
              {largeImgs.map((name, index) => (
                <LargeSticker key={index} onClick={onClick}>
                  <div>
                    <img
                      src={`../images/${customUrl}/${customUrl}_large_${index}.png`}
                      alt=""
                    />
                  </div>
                  <input
                    type="text"
                    name={name}
                    value={inputValue[`${name}`] || ""}
                    onChange={() => {}}
                  />
                </LargeSticker>
              ))}
            </StickerInnerWrap>
          </StickerColumn>
        </form>
      </StickerWrap>
      <form onSubmit={onSubmit}>
        <input type="submit" value="완료!!" />
      </form>
      <button
        onClick={() => {
          setInputValue({});
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
