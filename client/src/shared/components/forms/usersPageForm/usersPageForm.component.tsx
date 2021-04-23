import React from "react";
import { Formik, FormikErrors, FormikTouched, FormikValues } from "formik";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import { UsersPageFormComponentPropsInterface } from "../../../types/users/usersPageFormComponentProps.interface";

import styles from "./usersPageForm.component.module.scss";

export const UsersPageFormComponent = (
  props: UsersPageFormComponentPropsInterface
) => {
  const { initialValues, onSubmit, onCancel, organisations } = props;

  const validateForm = (values: FormikValues) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = 'Поле "E-mail" является обязательным.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Введите корректный email адрес.";
    }

    if (!values.firstName) {
      errors.firstName = 'Поле "Фамилия" является обязательным.';
    }

    if (!values.lastName) {
      errors.lastName = 'Поле "Имя" является обязательным.';
    }

    if (!values.organisationId || values.organisationId === 0) {
      errors.organisationId = 'Поле "Организация" является обязательным.';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
      }: {
        values: FormikValues;
        errors: FormikErrors<FormikValues>;
        touched: FormikTouched<FormikValues>;
        handleChange: any;
        handleSubmit: any;
        handleBlur: any;
      }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Пользователь</h2>
          <hr />

          <div className={styles.formField}>
            <TextField
              label="Фамилия"
              type="text"
              name="firstName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              style={{ width: "100%" }}
            />
            {errors.firstName && touched.firstName && (
              <p className={styles.error}>{errors.firstName}</p>
            )}
          </div>

          <div className={styles.formField}>
            <TextField
              label="Имя"
              type="text"
              name="lastName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              style={{ width: "100%" }}
            />
            {errors.lastName && touched.lastName && (
              <p className={styles.error}>{errors.lastName}</p>
            )}
          </div>

          <div className={styles.formField}>
            <TextField
              label="Отчество"
              type="text"
              name="middleName"
              onChange={handleChange}
              value={values.middleName}
              style={{ width: "100%" }}
            />
          </div>

          <div className={styles.formField}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="organisations-select-label">
                Организация
              </InputLabel>
              <Select
                labelId="organisations-select-label"
                id="organisations-select"
                name="organisationId"
                value={values.organisationId}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <MenuItem value={0}>Выберите организацию</MenuItem>
                {organisations?.map((org: any) => (
                  <MenuItem value={org.id} key={org.id}>
                    {org.fullName} ({org.shortName})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.organisationId && touched.organisationId && (
              <p className={styles.error}>{errors.organisationId}</p>
            )}
          </div>

          <div className={styles.formField}>
            <TextField
              label="E-Mail"
              type="email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              style={{ width: "100%" }}
            />
            {errors.email && touched.email && (
              <p className={styles.error}>{errors.email}</p>
            )}
          </div>

          <div className={styles.actionBtns}>
            <Button variant="contained" color="primary" type="submit">
              Ок
            </Button>
            <Button variant="contained" type="button" onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
