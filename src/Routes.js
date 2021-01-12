import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Bullseye } from '@patternfly/react-core/dist/esm/layouts/Bullseye';
import Loading from './Components/Loading/Loading';
import SigRoutes from './Routes/Signatures/Routes';
import { Spinner } from '@patternfly/react-core/dist/esm/components/Spinner';

const Oops = lazy(() => import(/* webpackChunkName: 'Oops' */ './Routes/OopsPage/OopsPage'));
const Noperms = lazy(() => import(/* webpackChunkName: 'Noperms' */ './Routes/NoPermissionsPage/NoPermissionsPage'));

const paths = { sigRoutes: '/', oops: '/oops', noperms: '/nopermissions' };

export const Routes = () => <Suspense fallback={<Bullseye><Spinner size="xl" /></Bullseye>}>
    <Switch>
        <Route key='signatures' path={paths.sigRoutes} rootClass='Insights'
            component={SigRoutes} />
        <Route key='noperms' exact path={paths.noperms} rootClass='Insights'
            component={() => <Suspense fallback={<Loading />}> <Noperms /> </Suspense>} />
        <Route key='oops' exact path={paths.oops} rootClass='Insights'
            component={() => <Suspense fallback={<Loading />}> <Oops /> </Suspense>} />
        <Redirect path='*' to={paths.oops} push />
    </Switch>
</Suspense >;
