import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { administerConfig } from './AdministerConfig'
import MyLayout from '../components/frame/MyLayout'
import { isAdminister, isSuperAdminister } from '../utils/auth'
import NoPermission from '../views/Common/NoPermission';

export default function AdministerRoutes() {
    return (
        isAdminister() || isSuperAdminister() ? (<MyLayout>
            <Switch>
                {administerConfig.map(route => {
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            render={
                                routeProp => { return <route.component {...routeProp} />; }
                            }
                        //component={route.component}
                        />);
                })}
                <Redirect to={administerConfig[0].path} from='/administer' />
                <Redirect to="/404" />
            </Switch>
        </MyLayout>) : <NoPermission></NoPermission>
    )
}


