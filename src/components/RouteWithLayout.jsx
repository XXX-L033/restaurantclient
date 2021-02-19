import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithLayout = (props) => {
  const { layout: Layout, component: Component } = props;
  return (
    <Route
      render={(matchProps) => (
        <Layout {...matchProps}>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
