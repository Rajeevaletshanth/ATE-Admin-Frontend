import React, { useState, useEffect } from "react";
import {
  Input,
  Alert,
  Button,
  Select,
  FormItem,
  FormContainer,
  Checkbox,
  Avatar,
  Upload,
  Notification,
  toast,
} from "components/ui";
import { MdOutlineFastfood } from "react-icons/md";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import { Field, Form, Formik } from "formik";
import CreatableSelect from "react-select/creatable";
import * as Yup from "yup";
import { editAddon } from "services/RestaurantApiServices";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too short")
    .max(50, "Name is too long")
    .required("Please enter the product name."),
  price: Yup.number()
    .max(10000, "Price is too high!")
    .required("Price required.")
});


const openNotification = (type, message) => {
  toast.push(
    <Notification
      title={type.charAt(0).toUpperCase() + type.slice(1)}
      type={type}
    >
      {message}
    </Notification>
  );
};

const EditAddon = ({ id, data, refresh, setRefresh }) => {

  return (
    <div className="pl-2">
      <Formik
        enableReinitialize
        initialValues={{
          name: data.name,
          price: data.price
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            let response = await editAddon(data.id, {
                name: values.name,
                restaurant_id: id,
                price: values.price,
            });
            
            if (response.data) {
              setSubmitting(false);
              if (response.data.response == "success") {
                openNotification("success", "Addon updated successfully.");
                setRefresh(!refresh);
              } else {
                openNotification("danger", response.data.message);
              }
            }
          } catch (error) {
            openNotification("danger", error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ values, touched, errors, resetForm, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Name"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="name"
                  placeholder="Name"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Price"
                invalid={errors.price && touched.price}
                errorMessage={errors.price}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="price"
                  placeholder="Price in Euro"
                  component={Input}
                />
              </FormItem>

              <FormItem>
                <Button
                  type="reset"
                  className="ltr:mr-2 rtl:ml-2"
                  onClick={resetForm}
                >
                  Reset
                </Button>
                <Button variant="solid" type="submit" loading={isSubmitting}>
                  {isSubmitting ? "Updating Addon..." : "Update"}
                </Button>
              </FormItem>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditAddon;
