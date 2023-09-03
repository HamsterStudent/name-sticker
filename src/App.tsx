import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Sticker from "./conponents/Sticker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { inputValueAtom } from "./atom";
import PrintModal from "./conponents/PrintModal";

const StickerBg = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const StickerContentsWrap = styled.section``;

const SelectWrap = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
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

const SubmitForm = styled.form`
  .submitBtn {
    padding: 5px 15px;
    border-radius: 20px;
    border: 0;
    margin-right: 5px;
    background-color: #c1ebc1;
    color: #252525;
  }
  .submitBtn:hover {
    background-color: #4d864d;
    color: #fff;
  }
  display: inline-block;
`;

function App() {
  const [active, setActive] = useState("dessert");
  const [customUrl, setCustomUrl] = useState("dessert");
  const inputValue = useRecoilValue(inputValueAtom);
  const setInputValue = useSetRecoilState(inputValueAtom);
  const [selectedFont, setSelectedFont] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    if (name === "dessert") {
      setCustomUrl("dessert");
    } else if (name === "leaf") {
      setCustomUrl("leaf");
    } else if (name === "mushroom") {
      setCustomUrl("mushroom");
    }
    setActive(name);
  };

  const seleteFont = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setSelectedFont(value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.sessionStorage.setItem("inputValue", JSON.stringify(inputValue));
    setShowModal(true);
  };

  return (
    <div className="App">
      <StickerBg>
        <StickerContentsWrap>
          <SelectWrap>
            <button
              onClick={onBtnClick}
              name="dessert"
              className={active === "dessert" ? "active" : undefined}
            >
              dessert
            </button>
            <button
              onClick={onBtnClick}
              name="leaf"
              className={active === "leaf" ? "active" : undefined}
            >
              leaf
            </button>
            <button
              onClick={onBtnClick}
              name="mushroom"
              className={active === "mushroom" ? "active" : undefined}
            >
              mushroom
            </button>
            <select onChange={seleteFont}>
              <option value="">--Please choose an font--</option>
              <option value="NeoDunggeunmo">둥근모꼴</option>
              <option value="Do Hyeon">도현체</option>
              <option value="Single Day">싱글 데이</option>
              <option value="Nanum Pen Script">나눔 펜 스크립트</option>
            </select>
          </SelectWrap>

          <Sticker customUrl={customUrl} selectedFont={selectedFont} />

          <SelectWrap>
            <SubmitForm onSubmit={onSubmit}>
              <input className="submitBtn" type="submit" value="완료!!" />
              {showModal ? (
                <PrintModal
                  setShowModal={setShowModal}
                  customUrl={customUrl}
                  selectedFont={selectedFont}
                />
              ) : null}
            </SubmitForm>
            <button
              onClick={() => {
                setInputValue({});
              }}
            >
              Reset
            </button>
          </SelectWrap>
        </StickerContentsWrap>
      </StickerBg>
    </div>
  );
}

export default App;
