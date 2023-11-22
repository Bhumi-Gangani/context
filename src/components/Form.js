import { useContext, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useFormik } from "formik";
import * as Yup from "yup";


//styled component

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
    }
`;

const Form = () => {
    const { isEdit, item, createItem, updateItem } = useContext(UserContext);

    let initialValues = {
        name: '',
        email: '',
        phone: '',
        gender: ''
    }

    // Validation
    const userSchema = Yup.object({
        name: Yup.string().required("Please enter name"),
        email: Yup.string().email().required("Please enter email"),
        phone: Yup.string().required("Please enter phone number"),
        gender: Yup.string().required("Please enter gender"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: (values, action) => {
            isEdit ? updateItem(item?.id, values) : createItem(values)
            navigate('/');
            action.resetForm();
        },
    });

    const { values, handleChange, handleSubmit, errors, touched, setValues } = formik;

    let navigate = useNavigate();

    useEffect(() => {
        if (isEdit) {
            setValues({
                name: item?.name,
                email: item?.email,
                phone: item?.phone,
                gender: item?.gender
            })
        }
    }, [item])

    return (
        <Container>
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={handleChange} name='name' value={values?.name} id="my-input" />
                {touched.name && errors.name ? (
                    <p className="form-error">{errors.name}</p>
                ) : null}
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={handleChange} name='email' value={values?.email} id="my-input" />
                {touched.email && errors.email ? (
                    <p className="form-error">{errors.email}</p>
                ) : null}
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={handleChange} name='phone' value={values?.phone} id="my-input" />
                {touched.phone && errors.phone ? (
                    <p className="form-error">{errors.phone}</p>
                ) : null}
            </FormControl>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="gender"
                    onChange={handleChange}
                    value={values?.gender}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                {touched.gender && errors.gender ? (
                    <p className="form-error">{errors.gender}</p>
                ) : null}
            </FormControl>
            <FormControl>
                <Button type='submit' variant="contained" color="primary" onClick={handleSubmit}>{isEdit ? 'Edit' : 'Add'}</Button>
            </FormControl>
        </Container>
    )
}

export default Form;