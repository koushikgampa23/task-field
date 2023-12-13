import { useState } from "react";
import { useEffect } from "react";
import { Dropdown, DropdownButton, Container, Row, Col } from "react-bootstrap";
import "./Home.css";

export const Home = () => {
  const [name, setName] = useState<string | null>();
  const [agent, setAgent] = useState("");
  const [unitNumber, setUnitNumber] = useState<string | undefined>();
  const [usage, setUsage] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();
  const [size, setSize] = useState<string | undefined>();
  const [uom, setUom] = useState<string | undefined>();
  const [amount, setAmount] = useState<string | undefined>();
  const [paymentType, setPaymentType] = useState<string | undefined>();
  const [remarks, setRemarks] = useState<string | undefined>();

  const regexNumber = /^[0-9]+$/;
  const regexAlphaNumeric = /^[a-zA-Z0-9]+$/;
  const regexDecimal = /^[-+]?\d*\.?\d+$/;

  // const validAgent = yard === "HK" && name === "JACK";
  // useEffect(() => {
  //   validAgent && setAgent("Not Applicable");
  // }, [validAgent]);

  let validateAmount = false;
  if (amount) {
    validateAmount = amount.length <= 10 && regexDecimal.test(amount);
  }

  return (
    <div className="wrapper">
      <Container fluid={true}>
        <Row>
          <Col lg={3}></Col>
        </Row>
        <Row>
          <Col lg={3}></Col>
          <Col lg={3}></Col>
        </Row>
        <select>
          <option>Bill To *</option>
          <option>JACK</option>
          <option>SAMSON</option>
          <option>JOHN</option>
        </select>
        <select>
          <option>Lessee*</option>
          <option>MAERSK</option>
          <option>CMACGM</option>
          <option>MSI</option>
        </select>
        <select
          onChange={(e) => {
            setAgent(e.target.value);
          }}
          // disabled={validAgent}
        >
          <option value="">Agent*</option>
          <option value="Agent 1">Agent 1</option>
          <option value="Agent 2">Agent 2</option>
          <option value="Agent 3">Agent 3</option>
        </select>
        <input
          type="text"
          placeholder="Amount*"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        {!validateAmount && amount !== undefined && (
          <span>The amount should be decimal && less than 10 characters</span>
        )}
        {amount && (
          <select
            onChange={(e) => {
              setPaymentType(e.target.value);
            }}
          >
            <option value="">Payment Type*</option>
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
          </select>
        )}
        <input type="checkbox" />
        Active
        <input
          type="Remarks"
          onChange={(e) => {
            setRemarks(e.target.value);
          }}
        />
      </Container>
    </div>
  );
};
