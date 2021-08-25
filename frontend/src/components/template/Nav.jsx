import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"/> Início
            </Link>
            <Link to="/animais">
                <i class="fa fa-paw"/> Animais
            </Link>
        </nav>
    </aside>
