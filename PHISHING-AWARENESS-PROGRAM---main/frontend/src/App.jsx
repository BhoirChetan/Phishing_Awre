import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

import Home from './pages/Home';
import PhishingBasics from './pages/PhishingBasics';
import EmailSimulator from './pages/EmailSimulator';
import FakeLogin from './pages/FakeLogin';
import WebsiteDetector from './pages/WebsiteDetector';
import SocialEngineering from './pages/SocialEngineering';
import CaseStudies from './pages/CaseStudies';
import Quiz from './pages/Quiz';
import SecurityTips from './pages/SecurityTips';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<PhishingBasics />} />
          <Route path="/email-simulator" element={<EmailSimulator />} />
          <Route path="/fake-login" element={<FakeLogin />} />
          <Route path="/website-detector" element={<WebsiteDetector />} />
          <Route path="/social-engineering" element={<SocialEngineering />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/security-tips" element={<SecurityTips />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

