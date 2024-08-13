import JournalModal from "../../../components/Modal/Modal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/store";

const TradeModal = () => {
  const [newTrade, setNewTrade] = useState({
    date: null,
    quantity: 0,
    type: '',
    entry_price: 0,
    stoploss: 0,
    charges: 0,
    symbol_id: null,
    journals_id: null
  })
  const dispatch = useDispatch()
  const [symbolList, setSymbolList] = useState([])
  const {id} = useParams()
  

  useEffect(() => {
    const symbolHandler = async () => {
      const list = await axios('http://localhost:3000/symbols/symbols')
      setSymbolList(list.data)
    }
    symbolHandler()
  }, [])

  const changeHandler = (e) => {
    setNewTrade({...newTrade, [e.target.name] : e.target.value, journals_id: id })
    
  }

  const submitHandler = async () => {
    try{
      const response = await axios.post('http://localhost:3000/trades', newTrade) 
    }
    catch(error){
      console.log(error)
    }
    dispatch(modalActions.change(false))
  }
  
  return (
    <JournalModal>
      <Modal.Header>
        <Modal.Title>Add Trade</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Symbol</Form.Label>
            <Form.Select aria-label="Default select example" onChange={changeHandler} name="symbol_id">
              <option>Select</option>
              {symbolList.map((symbol) => (
                <option value={symbol.id} key={symbol.id}>{symbol.symbol}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" onChange={changeHandler} autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" name="quantity" onChange={changeHandler}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select aria-label="Default select example" onChange={changeHandler} name="type">
              <option>Select</option>
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Entry Price</Form.Label>
            <Form.Control type="number" name="entry_price" onChange={changeHandler}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>StopLoss</Form.Label>
            <Form.Control type="number" name="stoploss" onChange={changeHandler}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Charges</Form.Label>
            <Form.Control type="number" name="charges" onChange={changeHandler}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(modalActions.change(false))}>
          Close
        </Button>
        <Button variant="primary" onClick={submitHandler}>Add</Button>
      </Modal.Footer>
    </JournalModal>
  );
};

TradeModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
};

export default TradeModal;
