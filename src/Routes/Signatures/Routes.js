import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Loading from '../../Components/Loading/Loading';

const List = lazy(() => import(/* webpackChunkName: 'Signature List' */ './Signatures'));
const Details = lazy(() => import(/* webpackChunkName: "Signature Details" */ './Details'));

const SigRoutes = () => <React.Fragment>
    <Switch>
        <Route exact path='/' component={() => <Suspense fallback={<Loading />}> <List /> </Suspense>} />
        <Route exact path='/:id' component={() => <Suspense fallback={<Loading />}> <Details /> </Suspense>} />
        <Redirect path='*' to='/oops' push />
    </Switch>
</React.Fragment>;

export default SigRoutes;
