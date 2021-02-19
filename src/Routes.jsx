import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Menu, PayOffline, Stripe, NotFound, Onboard} from '@/views';

import RouteWithLayout from '@/components/RouteWithLayout';
import { Minimal, Main, MainUpload } from '@/layouts';
import UploadMenu from '@/views/onboard/UploadMenu';


const Routes = () => (
    <Switch>
        {/* <RouteWithLayout
      component={NotFound}
      exact
      layout={MinimalLayout}
      path="/"
    /> */}
        <RouteWithLayout
            component={Onboard}
            exact
            layout={Main}
            path="/onboarding"
        />
        <RouteWithLayout
            component={UploadMenu}
            exact
            layout={MainUpload}
            path="/uploadMenu"
        />
        <RouteWithLayout
            component={Menu}
            exact
            layout={Minimal}
            path="/menu"
        />
        <RouteWithLayout
            component={PayOffline}
            exact
            layout={Minimal}
            path="/payoffline"
        />
        <RouteWithLayout
            component={Stripe}
            layout={Minimal}
            path="/checkout"
        />
        {/* ....... MORE ROUTES....... */}
        {/* <Redirect to="/not-found" /> */}
    </Switch>
);

export default Routes;
