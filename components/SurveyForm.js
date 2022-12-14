import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const SurveyForm = () => {
    return (
        <Container fluid="lg" className='grid'>
            <Col className="align-items-center text-light">
                        <h1 className='text-center'>Survey</h1>
                        <div className="pr-lg-5">
                        <form name="strain-survey" method="POST" data-netlify="true">
                            <input type="hidden" name="form-name" value="strain-survey" />
                            <p className='text-light mb-2'>Select the flavors you smell:</p>
                            <div className="flavor-grid">
                                <div className="flavor-grid-item">
                                    <label for="fruit-1">
                                        <input type="checkbox" id="fruit-1" name="fruits" value="berry" />
                                        Berry
                                    </label>
                                </div>
                                <div className="flavor-grid-item">
                                    <label for="fruit-2">
                                        <input type="checkbox" id="fruit-2" name="fruits" value="lemon" />
                                        Lemon
                                    </label>
                                </div>
                                <div className="flavor-grid-item">
                                    <label for="fruit-3">
                                        <input type="checkbox" id="fruit-3" name="fruits" value="blueberry" />
                                        Blueberry
                                    </label>
                                </div>
                            </div>

                            <p>
                                <label>Your Name: <input type="text" name="name" /></label>
                            </p>
                            <p>
                                <label>Your Email: <input type="email" name="email" /></label>
                            </p>

                            <p>
                                <label>Favorite Color(s): <select name="color[]">
                                    <option value="red">Red</option>
                                    <option value="green">Green</option>
                                    <option value="blue">Blue</option>
                                </select></label>
                            </p>
                            <p>
                                <label>Your Role: <select name="role[]" multiple>
                                    <option value="leader">Leader</option>
                                    <option value="follower">Follower</option>
                                </select></label>
                            </p>
                            <p>
                                <label>Message: <textarea name="message"></textarea></label>
                            </p>
                            <p>
                                <button type="submit">Send</button>
                            </p>
                        </form>
                        </div>
            </Col>
        </Container>
    );
}

export default SurveyForm;