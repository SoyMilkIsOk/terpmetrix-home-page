import React from "react";
import knex from 'knex';
// import database from '../../database';
import { useRouter } from "next/router";
import { Container, Row, Col } from "reactstrap";

const Report = () => {
    
    const router = useRouter()
    const { pid } = router.query

    return (
        // code to make test report page
        <div>
            <h1>Test Report - {pid}</h1>
            <p>Here is some text</p>
        </div>
    );
};

export default Report;