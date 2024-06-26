import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import {TopHeader, Menu, Container} from './styles';

export default function Layout() {
    return (
        <>
            <TopHeader>
                <Container>
                    <h1>Pokedex</h1>
                    <Menu>
                        <label><Link to="/">World</Link></label>
                        <label><Link to="/mypokedex">My Pokedex</Link></label>
                    </Menu>
                </Container>
            </TopHeader>
            <Outlet />
        </>
    );
}