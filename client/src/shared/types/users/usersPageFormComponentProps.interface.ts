import { UserInterface } from "../../../pages/usersPage/types/user.interface";
import { OrganisationInterface } from "../common/organisation.interface";
import { FormikValues } from "formik";

export interface UsersPageFormComponentPropsInterface {
  initialValues: UserInterface;
  onSubmit: (values: FormikValues) => void;
  onCancel: () => void;
  organisations: OrganisationInterface[] | null;
}
