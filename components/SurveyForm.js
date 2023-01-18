import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const SurveyForm = () => {
    return (
        <form className='' name="strain-survey" method="POST" data-netlify="true">
        <Container fluid="lg" className='grid'>
            <Row>
            <Col className="text-light mx-auto text-center">
                        <h1 className='text-center'>Strain Survey</h1>
                        <div className="pr-lg-5 mx-auto">
                            <input type="hidden" name="form-name" value="strain-survey" />
                            {/* Form question to confirm they are on the correct page that matches the strain theyre smoking */}
                            <p className='text-light mb-2'>What strain are you smoking?</p>
                            <p>
                                <label><input className='text-input' name ="strain" type="text" placeholder="Enter the strain name" /></label>
                            </p>
                            <p className='text-light mb-2'>How would you rate the strain&apos;s potency?</p>
                            <p>
                                <label name="potency">
                                        <input type="radio" value="1" name='strengthAns'/><span className='radio-text-label'>1</span>
                                        <input type="radio" value="2" name='strengthAns'/><span className='radio-text-label'>2</span>
                                        <input type="radio" value="3" name='strengthAns'/><span className='radio-text-label'>3</span>
                                        <input type="radio" value="4" name='strengthAns'/><span className='radio-text-label'>4</span>
                                        <input type="radio" value="5" name='strengthAns'/><span className='radio-text-label'>5</span>
                                        <input type="radio" value="6" name='strengthAns'/><span className='radio-text-label'>6</span>
                                        <input type="radio" value="7" name='strengthAns'/><span className='radio-text-label'>7</span>
                                        <input type="radio" value="8" name='strengthAns'/><span className='radio-text-label'>8</span>
                                        <input type="radio" value="9" name='strengthAns'/><span className='radio-text-label'>9</span>
                                        <input type="radio" value="10" name='strengthAns'/><span className='radio-text-label'>10</span>
                                </label>
                            </p>
                            {/* Multi-select question about what effects they feel */}
                            <p className='text-light mb-2'>What effects do you feel?</p>
                            <div className="effect-grid">
                                <div className="effect-grid-item">
                                    <label>
                                        <input type="checkbox" id="effect-1" name="effects" value="relaxed" />
                                        <span className='text-label'>Relaxed</span>
                                    </label>
                                </div>
                                <div className="effect-grid-item">
                                    <label>
                                        <input type="checkbox" id="effect-2" name="effects" value="happy" />
                                        <span className='text-label'>Happy</span>
                                    </label>
                                </div>
                                <div className="effect-grid-item">
                                    <label>
                                        <input type="checkbox" id="effect-3" name="effects" value="euphoric" />
                                        <span className='text-label'>Euphoric</span>
                                    </label>
                                </div>
                                <div className="effect-grid-item">
                                    <label>
                                        <input type="checkbox" id="effect-4" name="effects" value="focused" />
                                        <span className='text-label'>Focused</span>
                                    </label>
                                </div>
                                <div className="effect-grid-item">
                                    <label>
                                        <input type="checkbox" id="effect-5" name="effects" value="uplifted" />
                                        <span className='text-label'>Uplifted</span>
                                    </label>
                                </div>
                                <div className="effect-grid-item">
                                    <label>
                                        <input type="checkbox" id="effect-6" name="effects" value="creative" />
                                        <span className='text-label'>Creative</span>
                                    </label>
                                </div>
                            </div>
                            <p className='text-light mb-2'>Select the flavors you smell:</p>
                            <div className="flavor-grid">
                                <div className="flavor-grid-item">
                                    <label>
                                        <input type="checkbox" id="fruit-1" name="fruits" value="berry" />
                                        Berry
                                    </label>
                                </div>
                                <div className="flavor-grid-item">
                                    <label>
                                        <input type="checkbox" id="fruit-2" name="fruits" value="lemon" />
                                        Lemon
                                    </label>
                                </div>
                                <div className="flavor-grid-item">
                                    <label>
                                        <input type="checkbox" id="fruit-3" name="fruits" value="blueberry" />
                                        Blueberry
                                    </label>
                                </div>
                            </div>
                            <br></br>
                            <p>
                                <label>Your Name: <input type="text" name="name" /></label>
                            </p>
                            <p>
                                <label>Your Email: <input type="email" name="email" /></label>
                            </p>
                                <button type="submit">Send</button>
                        </div>
            </Col>
            </Row>
        </Container>
        </form>
    );
}

export default SurveyForm;