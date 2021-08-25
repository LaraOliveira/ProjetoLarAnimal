import React from 'react';
import Main from '../template/Main';

export default props =>
    <Main icon="home" title="Início" subtitle="Projeto lar animal"> 
        <div className="display-4">Seja Bem-Vindo!</div>
        <hr/>
        <p className="mb-0">Somos uma ONG de resgate de animais de rua, ajudamos cães e gatos a encontrar um novo lar!</p>
    </Main>