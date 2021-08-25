import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../components/home/Home';
import AnimalCrud from '../components/animal/AnimalCrud';

// eslint-disable-next-line import/no-anonymous-default-export
export default props=>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/animais' component={AnimalCrud} />
        <Redirect from='*' to='/' />
    </Switch>
