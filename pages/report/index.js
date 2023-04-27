// import React from "react";

// const Report = () => {
//     return (
//         <div>
//             <h1>Test Report</h1>
//             <p>Here is some text</p>
//         </div>
//     );
// }

// export default Report;

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import knex from "knex";
import getDataFromRDS from "../api/data";

async function Report() {
  const data = await getDataFromRDS();
  console.log(data);
  return (
    <Container>
      <Row>
        <Col>
        {data.map(item => (
        <p key={item.id}>{item.value}</p>
      ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Report;
