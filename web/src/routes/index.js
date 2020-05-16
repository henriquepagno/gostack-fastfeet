import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Delivery from '~/pages/Delivery';
import ManageDelivery from '~/pages/Delivery/ManageDelivery';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={Delivery} isPrivate />
      <Route path="/deliveries/new" component={ManageDelivery} isPrivate />
      <Route path="/deliveries/:id" component={ManageDelivery} isPrivate />
    </Switch>
  );
}
