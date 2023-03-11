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
import { editComboMenu } from "services/RestaurantApiServices";
import { getAvatar, uploadFile } from "services/ApiService";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too short")
    .max(50, "Name is too long")
    .required("Please enter the product name."),
  price: Yup.number()
    .max(10000, "Price is too high!")
    .required("Price required."),
  discount: Yup.number()
    .max(10000, "Price is too high!")
});

const uploadProfile = async (file) => {
  try {
    const avatar = await uploadFile(file);
    return avatar;
  } catch (error) {
    return error;
  }
};

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

const EditComboMenu = ({ id, data, refresh, setRefresh }) => {

  const [productImage, setProductImage] = useState([]);
  const [renderImage, setRenderImage] = useState([]);


  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, URL.createObjectURL(file[0]));
    setProductImage([file[0]]);
  };

  const getImage = async (filename) => {
    try {
      const profile = await getAvatar(filename);
      setRenderImage(URL.createObjectURL(profile));
    } catch (error) {
      setRenderImage([]);
    }
  };

  useEffect(() => {
    if (data.avatar) {
      getImage(data.avatar);
    }
  }, [data]);

  return (
    <div className="pl-2">
      <Formik
        enableReinitialize
        initialValues={{
          name: data.name,
          price: data.price,
          description: data.description,
          discount: data.discount,
          avatar: renderImage,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          let imageurl = "";
          if (productImage.length > 0) {
            imageurl = await uploadProfile(productImage);
          }
          try {
            setSubmitting(true);
            let response = {};
            if (imageurl) {
              response = await editComboMenu(data.id, {
                name: values.name,
                restaurant_id: id,
                description: values.description,
                price: values.price,
                discount: values.discount,
                avatar: imageurl,
              });
            } else {
              response = await editComboMenu(data.id, {
                name: values.name,
                restaurant_id: id,
                description: values.description,
                price: values.price,
                discount: values.discount,
              });
            }
            if (response.data) {
              setSubmitting(false);
              if (response.data.response == "success") {
                openNotification("success", "Combo Menu updated successfully.");
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
                label="Description"
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="description"
                  placeholder="Description"
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

              <FormItem
                label="Discount"
                invalid={errors.discount && touched.discount}
                errorMessage={errors.discount}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="discount"
                  placeholder="Discount in Euro"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Product Image"
                invalid={errors.avatar && touched.avatar}
                errorMessage={errors.avatar}
              >
                <Field name="avatar" component={Input}>
                  {({ field, form }) => {
                    const avatarProps = field.value
                      ? {
                          src:
                            productImage.length > 0 ? field.value : renderImage,
                        }
                      : {};
                    return (
                      <Upload
                        className="cursor-pointer"
                        onChange={(files) => onSetFormFile(form, field, files)}
                        onFileRemove={(files) =>
                          onSetFormFile(form, field, files)
                        }
                        showList={false}
                        uploadLimit={1}
                      >
                        <Avatar
                          className="border-2 border-white dark:border-gray-800 shadow-lg"
                          size={250}
                          shape="square"
                          icon={<MdOutlineFastfood />}
                          {...avatarProps}
                        />
                      </Upload>
                    );
                  }}
                </Field>
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
                  {isSubmitting ? "Updating Combo..." : "Update"}
                </Button>
              </FormItem>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditComboMenu;
