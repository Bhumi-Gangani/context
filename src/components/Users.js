import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom';

//styled component

const StyledButton = styled(Button)`
    margin: 50px 0 auto 50px;
`;

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 18px;
        background: #1565C0;
        color: #FFFFFF;
        text-align: center;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 16px;
        text-align: center;
    }
`;

const Users = () => {

    const { data, fetchData, deleteItem, readItem } = useContext(UserContext);

    const navigate = useNavigate();

    const editUserData = (id) => {
        readItem(id)
        navigate("/add")
    }

    const deleteUserData = async (id) => {
        await deleteItem(id)
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <StyledButton color="primary" variant="contained" onClick={() => navigate('/add')}>+ Add User</StyledButton>
            <StyledTable>
                <TableHead>
                    <THead>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Action</TableCell>
                    </THead>
                </TableHead>
                <TableBody>
                    {data?.map((user, index) => (
                        <TRow key={index}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell>
                                <Button color="primary" variant="outlined" onClick={() => editUserData(user.id)} style={{ marginRight: 10 }}>Edit</Button>
                                <Button variant="contained" color="error" onClick={() => deleteUserData(user.id)}>Delete</Button>
                            </TableCell>
                        </TRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Users