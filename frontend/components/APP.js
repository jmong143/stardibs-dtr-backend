import React from 'react'
import Router from 'react-router'

import Header from './parts/Header'


var { RouteHandler } = Router;


class APP extends React.Component{
    componentWillMount() {

    }

    render() {
        return (
            <div>
                <Header />
                <RouteHandler />

            </div>
        );
    }

}

module.exports = APP;
