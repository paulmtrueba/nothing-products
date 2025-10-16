import React from 'react';
import './index.css';
import { render } from 'react-dom';
import { AppRouter } from './AppRouter';
import ReactGA from "react-ga4";

ReactGA.initialize("G-L5825X8267"); // Replace with your GA4 Measurement ID
render(<AppRouter />, document.getElementById('root'));