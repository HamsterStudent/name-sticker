import { styled } from "styled-components";
import Sticker from "./Sticker";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

const ModalBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalWrap = styled.div`
  background-color: white;
  padding: 20px;
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  .print {
    background-color: #c1ebc1;
    color: #252525;
  }
  div {
    display: inline-block;
    padding: 5px 15px;
    border-radius: 20px;
    border: 0;
    margin-right: 5px;
    background-color: #e9e9ed;
  }
  .print:hover {
    background-color: #4d864d;
    color: #fff;
  }
  :hover {
    background-color: #252525;
    color: #fff;
  }
`;

interface IPrintModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  customUrl: string;
  selectedFont: string;
}

const PrintModal = ({ setShowModal, customUrl, selectedFont }: IPrintModal) => {
  const componentRef = useRef(null);
  return (
    <ModalBg>
      <ModalWrap>
        <Sticker
          customUrl={customUrl}
          selectedFont={selectedFont}
          disabledInput={true}
          printRef={componentRef}
        />
        <BtnWrap>
          <ReactToPrint
            trigger={() => <button>Print</button>}
            content={() => componentRef.current}
          />
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            close
          </button>
        </BtnWrap>
      </ModalWrap>
    </ModalBg>
  );
};

export default PrintModal;
