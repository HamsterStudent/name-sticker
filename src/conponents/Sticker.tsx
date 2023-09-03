import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { inputValueAtom } from "../atom";

const Sticker = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  div {
    height: 100%;
    position: absolute;
    margin-left: 3px;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;
const MiniSticker = styled(Sticker)`
  width: 90px;
  height: 35px;
  margin-bottom: 5px;
  div {
    width: 30%;
  }
`;
const BasicSticker = styled(Sticker)`
  width: 49%;
  height: 55px;
  margin-bottom: 5px;
  div {
    width: 25%;
  }
`;
const LargeSticker = styled(Sticker)`
  width: 32%;
  height: 55px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
  div {
    width: 35%;
  }
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
    text-indent: 23px;
    font-family: ${(props) => `${props.fontStyle}`};
  }
  input:focus {
    outline: none;
    border: solid 1px green;
  }
  input:disabled {
    outline: none;
    border: solid 1px #252525;
    color: #252525;
  }
  :last-child {
    margin-right: 0;
  }
  ${MiniSticker} {
    input {
      font-size: ${(props) =>
        props.fontStyle === "Single Day"
          ? "14px"
          : props.fontStyle === "Do Hyeon"
          ? "14px"
          : props.fontStyle === "Nanum Pen Script"
          ? "20px"
          : "12px"};
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
          ? "18px"
          : props.fontStyle === "Do Hyeon"
          ? "18px"
          : props.fontStyle === "Nanum Pen Script"
          ? "22px"
          : "15px"};
    }
  }
  @media print {
    input {
      box-sizing: border-box;
      /* border: solid 2px #252525; */
    }
    input:disabled {
      /* outline: 1px solid; */
      /* border: solid 1px #252525; */
      color: #252525;
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

interface ISticker {
  customUrl: string;
  selectedFont: string;
  disabledInput?: boolean;
  printRef?: React.MutableRefObject<null>;
}

function StickerSection({
  customUrl,
  selectedFont,
  disabledInput,
  printRef,
}: ISticker) {
  const [basicImgs, setBasicImgs] = useState<Array<string>>([]);
  const [miniImgs, setMiniImgs] = useState<Array<string>>([]);
  const [largeImgs, setLargeImgs] = useState<Array<string>>([]);
  const inputValue = useRecoilValue(inputValueAtom);
  const setInputValue = useSetRecoilState(inputValueAtom);

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
  const onchange = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setInputValue({ ...inputValue, [name]: value });
    console.log(inputValue);
  };
  return (
    <StickerWrap fontStyle={selectedFont} ref={printRef}>
      <form onChange={onchange}>
        <StickerColumn>
          {miniImgs.map((name, index) => (
            <MiniSticker key={index}>
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
                disabled={disabledInput ? true : false}
                maxLength={4}
              />
            </MiniSticker>
          ))}
        </StickerColumn>
        <StickerColumn>
          <StickerInnerWrap>
            {basicImgs.map((name, index) => (
              <BasicSticker key={index}>
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
                  disabled={disabledInput ? true : false}
                  maxLength={6}
                />
              </BasicSticker>
            ))}
          </StickerInnerWrap>
          <StickerInnerWrap>
            {largeImgs.map((name, index) => (
              <LargeSticker key={index}>
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
                  disabled={disabledInput ? true : false}
                  maxLength={4}
                />
              </LargeSticker>
            ))}
          </StickerInnerWrap>
        </StickerColumn>
      </form>
    </StickerWrap>
  );
}

export default StickerSection;
