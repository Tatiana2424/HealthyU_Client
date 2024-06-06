import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <>
            <footer className="footer text-light no-print">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>HealthyU</h5>
                            <p>
                                We're proud to have created a space where the
                                conversation about health and wellness is
                                ongoing and dynamic.
                            </p>
                            <div className="social-icons">
                                {/* Insert your social media icons here */}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <h5>Navigation</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="/about-us">About Us</a>
                                </li>
                                <li>
                                    <a href="/search">Search</a>
                                </li>
                                <li>
                                    <a href="/bmi-page">BMI Calculator</a>
                                </li>
                                <li>
                                    <a href="/chat-page">Chat Assistant</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h5>Contacts</h5>
                            <p>
                                <span className="contacts-field">Address:</span>{' '}
                                1010 3rd Ave, New York
                            </p>
                            <p>
                                <span className="contacts-field">Phone:</span>{' '}
                                +(380) 567 89 00
                            </p>
                            <p>
                                <span className="contacts-field">E-mail:</span>{' '}
                                healthyU@email.com
                            </p>
                        </div>
                        <div className="col-md-3">
                            <h5>Subscribe</h5>
                            <form>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email*"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success mt-2"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="footer-bottom text-center mt-4">
                        <p>© Created by Your Company. All rights Reserved</p>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;
