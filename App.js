// src/App.js
import React from 'react';

import ProductList from './component/productList';
import BasicExample from './component/navbar';
import Footer from './component/footer';
import Details from './component/details'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'; // Import default CSS

function App() {
    return (
        <Router> {/* Wrap the app in Router for routing functionality */}
            <div className="app">
                <BasicExample />
                <div className="container mt-5">
                    <div className="row">
                        <Routes>
                            <Route path="/" element={<ProductList />} />
                            <Route path="/checkout/:id" element={<Details />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
