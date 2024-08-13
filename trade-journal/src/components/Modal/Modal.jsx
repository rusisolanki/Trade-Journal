import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/store";

function JournalModal({ children }) {
  const dispatch = useDispatch()
  const showModal = useSelector(state => state.modalReducer.showModal)
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => dispatch(modalActions.change(false))}
        backdrop="static"
        keyboard={false}
        scrollable
      >
        {children}
      </Modal>
    </div>
  );
}
JournalModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  children: PropTypes.array
};

export default JournalModal;
