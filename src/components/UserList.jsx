import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, updateUserRole } from "./features/userDetailSlice";
import { deleteUser } from "./features/userDetailSlice";
import { Link } from "react-router-dom";


export default function UserList() {

    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const { users, loading, error } = useSelector((state) => state.user)

    console.log("this is user", users)

    const filteredUsers = users.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');



    // Function to handle role change
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };



    // const handleRoleChange = async (e) => {
    //     e.preventDefault();
    //     console.log("uuuu", e.target.value);
    //     dispatch(updateUserRole());
    //     // navigate("/view");
    // };

    useEffect(() => {
        dispatch(getUsers());
        // setRoles(users.role);

    }, []);

    return (
        <>
            <div>
                <div>User list</div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name"
                />
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers && filteredUsers.map((ele, index) =>
                                <tr key={index}>
                                    <td>
                                        {ele.name}
                                    </td>
                                    <td>
                                        {ele.email}
                                    </td>
                                    {/* <td>
                                        {ele.role}
                                    </td> */}
                                    <td>
                                        <p>{ele.role}</p>
                                        <select value={ele.role} onChange={handleRoleChange}>

                                        </select>

                                    </td>
                                    <Link
                                        onClick={() => dispatch(deleteUser(ele.id))}
                                        className="card-link"
                                    >
                                        Delete
                                    </Link>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
