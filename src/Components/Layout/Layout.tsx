import { Col, Container, Row } from "react-bootstrap";
import "./Layout.css";
import { useEffect, useState } from "react";
import { CustomDropDown } from "./CustomDropDown";
import { ErrorMessage } from "./ErrorMessage";
import { Header } from "../Header/Header";
import EstimateComponent from "./EstimateComponent";
import Switch from "@mui/material/Switch";

export const Layout = () => {
  const layoutSizes = {
    sm: 6,
    md: 4,
    lg: 3,
  };
  const [yard, setYard] = useState<string | null>();
  const [name, setName] = useState<string | null>();
  const [agent, setAgent] = useState<string | undefined | null>();
  const [unitNumber, setUnitNumber] = useState<string | undefined>();
  const [usage, setUsage] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>("");
  const [size, setSize] = useState<string | undefined>("");
  const [uom, setUom] = useState<string | undefined>();
  const [amount, setAmount] = useState<string | undefined>();
  const [paymentType, setPaymentType] = useState<string | undefined | null>();
  const [remarks, setRemarks] = useState<string | undefined>();
  const [estimateType, setEstimateType] = useState<string | undefined | null>();
  const [damageType, setDamageType] = useState<string | undefined | null>();
  const [bill, setBill] = useState<string | undefined | null>();
  const [lesse, setLesse] = useState<string | undefined | null>();
  const [estimateDate, setEstimateDate] = useState("");
  const [toggle, setToggle] = useState(true);
  const [dateError, setDateError] = useState("");

  const regexNumber = /^[0-9]+$/;
  const regexAlphaNumeric = /^[a-zA-Z0-9]+$/;
  const regexDecimal = /^[-+]?\d*\.?\d+$/;

  const validAgent = yard === "HK" && name === "JACK";
  useEffect(() => {
    validAgent && setAgent("Not Applicable");
  }, [validAgent]);

  const data = {
    Yard: yard,
    CustomerName: name,
    UnitNumber: unitNumber,
    Usage: usage,
    Type: type,
    Size: size,
    EstimateDate: estimateDate,
    EstimateType: estimateType,
    DamageType: damageType,
    UOM: uom,
    BillTO: bill,
    Lesse: lesse,
    Agent: agent,
    Amount: amount,
    PaymentType: paymentType,
    active: toggle,
    Remarks: remarks,
  };

  let validateAmount = false;
  if (amount) {
    validateAmount = amount.length <= 10 && regexDecimal.test(amount);
  }

  return (
    <>
      <Header data={data} toggle={toggle} />
      <Container fluid={true} className="containerStyle">
        <Row>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={yard ? "columnStyle" : ""}
          >
            <CustomDropDown
              title={"Yard*"}
              fields={["HK", "AU", "OT"]}
              fieldState={yard}
              setFieldState={setYard}
            />
            {!yard && <ErrorMessage>*Required Field</ErrorMessage>}
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={name ? "columnStyle" : ""}
          >
            <CustomDropDown
              title={"Customer Name*"}
              fields={["JACK", "SAMSON", "JOHN"]}
              fieldState={name}
              setFieldState={setName}
            />
            {!name && <ErrorMessage>*Required Field</ErrorMessage>}
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={
              !unitNumber || !regexNumber.test(unitNumber) ? "" : "columnStyle"
            }
          >
            <input
              type="text"
              placeholder="Unit Number*"
              onChange={(e) => {
                setUnitNumber(e.target.value);
              }}
              className="inputStyle"
            />
            {unitNumber && !regexNumber.test(unitNumber) && (
              <ErrorMessage>*Numeric Values Required</ErrorMessage>
            )}
            {!unitNumber && <ErrorMessage>*Required Field</ErrorMessage>}
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={
              !usage || !regexAlphaNumeric.test(usage) ? "" : "columnStyle"
            }
          >
            <input
              type="text"
              placeholder="Usage*"
              onChange={(e) => {
                setUsage(e.target.value);
              }}
              className="inputStyle"
            />
            {usage && !regexAlphaNumeric.test(usage) && (
              <ErrorMessage>*Only AplhaNumeric Allowed</ErrorMessage>
            )}
            {!usage && <ErrorMessage>*Required Field</ErrorMessage>}
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={
              type && !regexAlphaNumeric.test(type) ? "" : "columnStyle"
            }
          >
            <div className="subContainer">
              <div>
                <input
                  type="text"
                  placeholder="Type"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  className="inputStyleHalf spaceBetween"
                />
                {type && !regexAlphaNumeric.test(type) && (
                  <ErrorMessage>*Only AplhaNumeric Allowed</ErrorMessage>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Size"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                  className="inputStyleHalf"
                />
                {size && !regexNumber.test(size) && (
                  <ErrorMessage>*Only Numeric Allowed</ErrorMessage>
                )}
              </div>
            </div>
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={dateError ? "" : "columnStyle"}
          >
            <EstimateComponent
              estimateDate={estimateDate}
              setEstimateDate={setEstimateDate}
              className="inputStyle"
              setDateError={setDateError}
            />
            {dateError && <ErrorMessage>{dateError}</ErrorMessage>}
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={!estimateType ? "" : "columnStyle"}
          >
            <CustomDropDown
              title="Estimate Type*"
              fields={["Type 1", "Type 2", "Type 3"]}
              fieldState={estimateType}
              setFieldState={setEstimateType}
            />
            {!estimateType && <ErrorMessage>*Required Field</ErrorMessage>}
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={!damageType ? "" : "columnStyle"}
          >
            <CustomDropDown
              title="Damage Type*"
              fields={["Internal", "External"]}
              fieldState={damageType}
              setFieldState={setDamageType}
            />
            {!damageType && <ErrorMessage>*Required Field</ErrorMessage>}
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={!uom || !regexNumber.test(uom) ? "" : "columnStyle"}
          >
            <input
              type="text"
              placeholder="UOM*"
              onChange={(e) => {
                setUom(e.target.value);
              }}
              className="inputStyle"
            />
            {uom && !regexNumber.test(uom) && (
              <ErrorMessage>The Field should be numeric</ErrorMessage>
            )}
            {!uom && <ErrorMessage>*Required Field</ErrorMessage>}
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={!bill ? "" : "columnStyle"}
          >
            <CustomDropDown
              title="Bill To*"
              fields={["JACK", "SAMSON", "JOHN"]}
              fieldState={bill}
              setFieldState={setBill}
            />
            {!bill && <ErrorMessage>*Required Field</ErrorMessage>}
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={!lesse ? "" : "columnStyle"}
          >
            <CustomDropDown
              title={"Lessee*"}
              fields={["MAERSK", "CMACGM", "MSI"]}
              fieldState={lesse}
              setFieldState={setLesse}
            />
            {!lesse && <ErrorMessage>*Required Field</ErrorMessage>}
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={!agent ? "" : "columnStyle"}
          >
            <CustomDropDown
              title="Agent*"
              fields={["Agent 1", "Agent 2", "Agent 3", "Not Applicable"]}
              fieldState={agent}
              setFieldState={setAgent}
              disabled={validAgent}
            />
            {!agent && !validAgent && (
              <ErrorMessage>*Required Field</ErrorMessage>
            )}
          </Col>
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className={!amount || !validateAmount ? "" : "columnStyle"}
          >
            <input
              type="text"
              placeholder="Amount*"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              className="inputStyle"
            />
            {!validateAmount && amount && (
              <ErrorMessage>
                {"*Decimal and Character < 10 allowed"}
              </ErrorMessage>
            )}
            {!amount && <ErrorMessage>*Required Field</ErrorMessage>}
          </Col>
          {amount && (
            <Col
              sm={layoutSizes.sm}
              md={layoutSizes.md}
              lg={layoutSizes.lg}
              className={!paymentType ? "" : "columnStyle"}
            >
              <>
                <CustomDropDown
                  title="Payment Type*"
                  fields={["Cash", "Online"]}
                  fieldState={paymentType}
                  setFieldState={setPaymentType}
                />
                {!paymentType && <ErrorMessage>*Required Field</ErrorMessage>}
              </>
            </Col>
          )}
          <Col
            sm={layoutSizes.sm}
            md={layoutSizes.md}
            lg={layoutSizes.lg}
            className="columnStyle"
          >
            <Switch
              checked={toggle}
              onChange={() => {
                setToggle(!toggle);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            Active
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={8} lg={9} className="columnStyle">
            <input
              type="text"
              placeholder="Remarks*"
              className="remarks inputStyle"
              onChange={(e) => {
                setRemarks(e.target.value);
              }}
            />
            {!remarks && <ErrorMessage>*Required Field</ErrorMessage>}
          </Col>
        </Row>
      </Container>
    </>
  );
};
