import { Field, Form } from "react-final-form";
import { ErrorMessage } from "./ErrorMessage";
import { CustomDropDown } from "./CustomDropDown";
import { Button, Col, Container, Row } from "react-bootstrap";
import EstimateComponent from "./EstimateComponent";
import { Switch } from "@mui/material";
import { IoIosWarning } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { IoSave } from "react-icons/io5";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import "react-toastify/dist/ReactToastify.css";
import "./BaseLayout.css";

export const BaseLayout = () => {
  const layoutSizes = {
    sm: 6,
    md: 4,
    lg: 3,
  };

  const regexNumber = /^[0-9]+$/;
  const regexAlphaNumeric = /^[a-zA-Z0-9]+$/;
  const regexDecimal = /^[-+]?\d*\.?\d+$/;

  const taskData = collection(db, "taskData");
  const onSubmit = async (data: any) => {
    try {
      await addDoc(taskData, { ...data });
      toast.success("Data Inserted", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (e) {
      toast.error(
        "Failed to Insert Data please fill all required fields and enter valid entries",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };
  const validateValues = (values: any) => {
    const errors: any = {};
    if (values.yard.selected === "") {
      errors.yard = "*Required Field";
    }
    if (values.customerName.selected === "") {
      errors.customerName = "*Required Field";
    }
    if (!values.unitNumber) {
      errors.unitNumber = "*Required Field";
    } else {
      if (!regexNumber.test(values.unitNumber)) {
        errors.unitNumber = "*Only numeric value allowed";
      }
    }
    if (!values.usage) {
      errors.usage = "*Required Field";
    } else {
      if (!regexAlphaNumeric.test(values.usage)) {
        errors.usage = "*Only AlphaNumeric value allowed";
      }
    }
    if (values.type) {
      if (!regexAlphaNumeric.test(values.type)) {
        errors.type = "*Only AlphaNumeric values Allowed";
      }
    }
    if (values.size) {
      if (!regexNumber.test(values.size)) {
        errors.size = "*Only Numeric values Allowed";
      }
    }
    if (!values.estimateType.selected) {
      errors.estimateType = "*Required Field";
    }
    if (!values.damageType.selected) {
      errors.damageType = "*Required Field";
    }
    if (!values.uom) {
      errors.uom = "*Required Field";
    } else {
      if (!regexNumber.test(values.uom)) {
        errors.uom = "*Only Numeric Values Allowed";
      }
    }
    if (!values.billTo.selected) {
      errors.billTo = "*Required Field";
    }
    if (!values.lesse.selected) {
      errors.lesse = "*Required Field";
    }
    if (!values.agent.selected) {
      errors.agent = "*Required Field";
    }
    if (!values.amount) {
      errors.amount = "*Required Field";
    } else {
      if (!regexDecimal.test(values.amount)) {
        errors.amount = "*Decimal and Character < 10 allowed";
      }
    }
    if (!values.paymentType.selected) {
      errors.paymentType = "*Required Field";
    }
    if (!values.remarks) {
      errors.remarks = "*Required Field";
    }
    return errors;
  };
  const initalValues = {
    yard: {
      title: "Yard*",
      fields: ["HK", "AU", "OT"],
      selected: "",
    },
    customerName: {
      title: "Customer Name*",
      fields: ["JACK", "SAMSON", "JOHN"],
      selected: "",
    },
    unitNumber: "",
    usage: "",
    type: "",
    size: "",
    estimateDate: "",
    estimateType: {
      title: "Estimate Type*",
      fields: ["Type 1", "Type 2", "Type 3"],
      selected: "",
    },
    damageType: {
      title: "Damage Type*",
      fields: ["Internal", "External"],
      selected: "",
    },
    uom: "",
    billTo: {
      title: "Bill To*",
      fields: ["JACK", "SAMSON", "JOHN"],
      selected: "",
    },
    lesse: {
      title: "Lesse*",
      fields: ["MAERSK", "CMACGM", "MSI"],
      selected: "",
    },
    agent: {
      title: "Agent*",
      fields: ["Agent 1", "Agent 2", "Agent 3", "Not Applicable"],
      selected: "Not Applicable",
    },
    amount: "",
    paymentType: {
      title: "Payment Type*",
      fields: ["Cash", "Online"],
      selected: "",
    },
    active: true,
    remarks: "",
  };
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={validateValues}
        initialValues={initalValues}
        render={({ handleSubmit, form, submitFailed }) => (
          <form onSubmit={handleSubmit}>
            <div className="background">
              <div>
                <span>Header Information</span>
                {!form.getState().values.active && (
                  <span>
                    (<IoIosWarning />
                    Warning: The active is off)
                  </span>
                )}
              </div>
              <ToastContainer />
              <Button
                variant="warning"
                className="buttonContainer"
                type="submit"
              >
                <IoSave />
                Save
              </Button>
            </div>
            <Container fluid={true} className="containerStyle">
              <Row>
                <Field name="yard">
                  {({ meta }) => (
                    <Col
                      sm={layoutSizes.sm}
                      md={layoutSizes.md}
                      lg={layoutSizes.lg}
                      className={
                        meta.error && meta.touched ? "errorStyle" : "rowStyle"
                      }
                    >
                      <CustomDropDown
                        fields={initalValues.yard.fields}
                        title={initalValues.yard.title}
                        fieldName={"yard"}
                      />
                    </Col>
                  )}
                </Field>
                <Field name="customerName">
                  {({ meta }) => (
                    <Col
                      sm={layoutSizes.sm}
                      md={layoutSizes.md}
                      lg={layoutSizes.lg}
                      className={
                        meta.error && meta.touched ? "errorStyle" : "rowStyle"
                      }
                    >
                      <CustomDropDown
                        fields={initalValues.customerName.fields}
                        title={initalValues.customerName.title}
                        fieldName={"customerName"}
                      />
                    </Col>
                  )}
                </Field>
                <Field name="unitNumber">
                  {({ input, meta }) => (
                    <>
                      <Col
                        sm={layoutSizes.sm}
                        md={layoutSizes.md}
                        lg={layoutSizes.lg}
                        className={
                          meta.error && meta.touched ? "errorStyle" : "rowStyle"
                        }
                      >
                        <input
                          type="text"
                          {...input}
                          placeholder="Unit Number"
                          className="inputStyle"
                        />
                        {meta.touched && meta.error && (
                          <ErrorMessage>{meta.error}</ErrorMessage>
                        )}
                      </Col>
                    </>
                  )}
                </Field>

                <Field name="usage">
                  {({ input, meta }) => (
                    <>
                      <Col
                        sm={layoutSizes.sm}
                        md={layoutSizes.md}
                        lg={layoutSizes.lg}
                        className={
                          meta.error && meta.touched ? "errorStyle" : "rowStyle"
                        }
                      >
                        <input
                          type="text"
                          {...input}
                          placeholder="Usage"
                          className="inputStyle"
                        />
                        {meta.touched && meta.error && (
                          <ErrorMessage>{meta.error}</ErrorMessage>
                        )}
                      </Col>
                    </>
                  )}
                </Field>
                <Col
                  sm={layoutSizes.sm}
                  md={layoutSizes.md}
                  lg={layoutSizes.lg}
                  className="rowStyle"
                >
                  <div className="subContainer">
                    <Field name="type">
                      {({ input, meta }) => (
                        <div>
                          <input
                            type="text"
                            {...input}
                            placeholder="Type"
                            className="inputStyleHalf spaceBetween"
                          />
                          {meta.touched && meta.error && (
                            <ErrorMessage>{meta.error}</ErrorMessage>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name="size">
                      {({ input, meta }) => (
                        <div>
                          <input
                            type="text"
                            {...input}
                            placeholder="Size"
                            className="inputStyleHalf"
                          />
                          {meta.touched && meta.error && (
                            <ErrorMessage>{meta.error}</ErrorMessage>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                </Col>

                <Field name="estimateDate">
                  {({ meta }) => (
                    <Col
                      sm={layoutSizes.sm}
                      md={layoutSizes.md}
                      lg={layoutSizes.lg}
                      className={meta.error ? "errorStyle" : "rowStyle"}
                    >
                      <>
                        <EstimateComponent
                          field="estimateDate"
                          className="inputStyle"
                        />
                        {meta.error && (
                          <ErrorMessage>{meta.error}</ErrorMessage>
                        )}
                      </>
                    </Col>
                  )}
                </Field>
                <Field name="estimateType">
                  {({ meta }) => (
                    <Col
                      sm={layoutSizes.sm}
                      md={layoutSizes.md}
                      lg={layoutSizes.lg}
                      className={
                        meta.error && meta.touched ? "errorStyle" : "rowStyle"
                      }
                    >
                      <CustomDropDown
                        fields={initalValues.estimateType.fields}
                        title={initalValues.estimateType.title}
                        fieldName={"estimateType"}
                      />
                    </Col>
                  )}
                </Field>
                <Field name="damageType">
                  {({ meta }) => (
                    <Col
                      sm={layoutSizes.sm}
                      md={layoutSizes.md}
                      lg={layoutSizes.lg}
                      className={
                        meta.error && meta.touched ? "errorStyle" : "rowStyle"
                      }
                    >
                      <CustomDropDown
                        fields={initalValues.damageType.fields}
                        title={initalValues.damageType.title}
                        fieldName={"damageType"}
                      />
                    </Col>
                  )}
                </Field>
                <Field name="uom">
                  {({ input, meta }) => (
                    <>
                      <Col
                        sm={layoutSizes.sm}
                        md={layoutSizes.md}
                        lg={layoutSizes.lg}
                        className={
                          meta.error && meta.touched ? "errorStyle" : "rowStyle"
                        }
                      >
                        <input
                          type="text"
                          {...input}
                          placeholder="UOM*"
                          className="inputStyle"
                        />
                        {meta.touched && meta.error && (
                          <ErrorMessage>{meta.error}</ErrorMessage>
                        )}
                      </Col>
                    </>
                  )}
                </Field>

                <Field name="billTo">
                  {({ meta }) => (
                    <Col
                      sm={layoutSizes.sm}
                      md={layoutSizes.md}
                      lg={layoutSizes.lg}
                      className={
                        meta.error && meta.touched ? "errorStyle" : "rowStyle"
                      }
                    >
                      <CustomDropDown
                        fields={initalValues.billTo.fields}
                        title={initalValues.billTo.title}
                        fieldName={"billTo"}
                      />
                    </Col>
                  )}
                </Field>
                <Field name="lesse">
                  {({ meta }) => (
                    <Col
                      sm={layoutSizes.sm}
                      md={layoutSizes.md}
                      lg={layoutSizes.lg}
                      className={
                        meta.error && meta.touched ? "errorStyle" : "rowStyle"
                      }
                    >
                      <CustomDropDown
                        fields={initalValues.lesse.fields}
                        title={initalValues.lesse.title}
                        fieldName={"lesse"}
                      />
                    </Col>
                  )}
                </Field>
                <Field name="agent">
                  {({ meta }) => (
                    <Col
                      sm={layoutSizes.sm}
                      md={layoutSizes.md}
                      lg={layoutSizes.lg}
                      className={
                        meta.error && meta.touched ? "errorStyle" : "rowStyle"
                      }
                    >
                      <CustomDropDown
                        fields={initalValues.agent.fields}
                        title={initalValues.agent.title}
                        fieldName={"agent"}
                        disabled={
                          form.getState().values.customerName.selected ===
                            "JACK" &&
                          form.getState().values.yard.selected === "HK"
                        }
                      />
                    </Col>
                  )}
                </Field>
                <Field name="amount">
                  {({ input, meta }) => (
                    <>
                      <Col
                        sm={layoutSizes.sm}
                        md={layoutSizes.md}
                        lg={layoutSizes.lg}
                        className={
                          meta.error && meta.touched ? "errorStyle" : "rowStyle"
                        }
                      >
                        <input
                          type="text"
                          {...input}
                          placeholder="Amount*"
                          className="inputStyle"
                        />
                        {meta.touched && meta.error && (
                          <ErrorMessage>{meta.error}</ErrorMessage>
                        )}
                      </Col>
                    </>
                  )}
                </Field>
                {form.getState().values.amount && (
                  <Field name="paymentType">
                    {({ meta }) => (
                      <Col
                        sm={layoutSizes.sm}
                        md={layoutSizes.md}
                        lg={layoutSizes.lg}
                        className={"errorStyle"}
                      >
                        <>
                          <CustomDropDown
                            fields={initalValues.paymentType.fields}
                            title={initalValues.paymentType.title}
                            fieldName={"paymentType"}
                          />
                        </>
                      </Col>
                    )}
                  </Field>
                )}
                <Col
                  sm={layoutSizes.sm}
                  md={layoutSizes.md}
                  lg={layoutSizes.lg}
                  className="errorStyle"
                >
                  <Field name="active">
                    {({ input }) => (
                      <>
                        <Switch
                          checked={input.value}
                          onChange={() => input.onChange(!input.value)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                        Active
                      </>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={8} lg={9} className="columnStyle">
                  <Field name="remarks">
                    {({ input, meta }) => (
                      <>
                        <input
                          type="text"
                          {...input}
                          placeholder="Remarks*"
                          className="inputStyle"
                        />
                        {meta.touched && meta.error && (
                          <ErrorMessage>{meta.error}</ErrorMessage>
                        )}
                      </>
                    )}
                  </Field>
                </Col>
              </Row>
            </Container>
          </form>
        )}
      />
    </div>
  );
};
