import * as yup from 'yup';

const profileDetails = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subscription: yup.string().required('Subscription type is required'),
});

const Validations = { profileDetails };

export default Validations;
