import React from 'react';
import { Table } from 'react-bootstrap';
import { getUser } from '../lib/auth';
import { useState, useEffect } from 'react';

export default function UserTable({ data }) {

    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        async function loaddetails() {
            const user = await getUser();

            const res = await fetch(`http://ec2co-ecsel-1ba9i1m8o403i-580755584.us-east-1.elb.amazonaws.com:8080/v1/posting`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${user.idToken}`,
                },
            });
            let id_list = await res.json();
            id_list = id_list.postings;
            let data_list = [];
            console.log("Got user fragments data", { id_list });

            for (var prop = 0; prop < id_list.length; prop++) {
                const res = await fetch(`http://ec2co-ecsel-1ba9i1m8o403i-580755584.us-east-1.elb.amazonaws.com:8080/v1/posting/${id_list[prop]}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${user.idToken}`,
                    },
                });
                data = await res.json();
                data_list.push(data);
            }
            console.log("Got user fragments data", { data_list });
            setDataList(data_list);

        }
        loaddetails();
    }, []);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th>Qualification</th>
                    <th>Job Description</th>
                    <th>Graduate</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </Table>
    );
}