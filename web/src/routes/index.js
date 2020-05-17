import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Delivery from '~/pages/Delivery';
import ManageDelivery from '~/pages/Delivery/ManageDelivery';

import Deliveryman from '~/pages/Deliveryman';
import ManageDeliverymen from '~/pages/Deliveryman/ManageDeliveryman';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={Delivery} isPrivate />
      <Route path="/deliveries/new" component={ManageDelivery} isPrivate />
      <Route path="/deliveries/:id" component={ManageDelivery} isPrivate />

      <Route path="/deliverymen" exact component={Deliveryman} isPrivate />
      <Route path="/deliverymen/new" component={ManageDeliverymen} isPrivate />
      <Route path="/deliverymen/:id" component={ManageDeliverymen} isPrivate />
    </Switch>
  );
}
