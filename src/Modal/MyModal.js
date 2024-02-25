import styled from "styled-components";

const ModalBackground = styled.div`
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);
`;
const ModalBody = styled.div`
    background-color: white;
    margin: 10% auto;
    padding: 20px;
    width: 50%;
`;

export const MyModal = ({ children, shouldShow, onRequestClose }) => {

    return (
        <>
        {shouldShow && (
            <ModalBackground>
                <ModalBody onClick={e => e.stopPropagation()}>
                    {children}
                    <div><button className="modal-button" onClick={onRequestClose}>Close</button></div>
                </ModalBody>
            </ModalBackground>
        )}
        </>
    )
}

{/* <ModalBody onClick={e => e.stopPropagation()}></ModalBody> */}