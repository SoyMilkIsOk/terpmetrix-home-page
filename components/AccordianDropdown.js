import {React, useState} from "react";
import {  Accordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap";


const AccordianDropdown = () => {
  const [index, setIndex] = useState(1);

  function toggle(newIndex) {
    if (newIndex === index) {
      setIndex(1);
    } else {
      setIndex(newIndex);
    }
  }

  return (
    <div className="container-md">
      <Accordion
        open={index}
        toggle={toggle}
      >
        <AccordionItem>
          <AccordionHeader targetId="1">
            Accordion Item 1
          </AccordionHeader>
          <AccordionBody accordionId="1">
            <strong>
              This is the first items accordion body.
            </strong>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">
            Accordion Item 2
          </AccordionHeader>
          <AccordionBody accordionId="2">
            <strong>
              This is the second items accordion body.
            </strong>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="3">
            Accordion Item 3
          </AccordionHeader>
          <AccordionBody accordionId="3">
            <strong>
              This is the third items accordion body.
            </strong>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AccordianDropdown;