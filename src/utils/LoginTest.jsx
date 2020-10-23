import React from 'react'
import qs from 'querystring'
import { loginSSOAccess } from '../services/sso'
export default class LoginTest extends React.Component {

    async componentDidMount(){
        const queryString = this.props.location.search ? this.props.location.search.substring(1) : ''
        const queryObject = qs.parse(queryString)
        //console.log(queryObject)
        const params = {
          code: queryObject.code
        }
        console.log(params)
        const res = await loginSSOAccess(params)
        console.log(res)
    }
    render() {
        
        return (
            <h1>LOADING...</h1>
        )
    }
}
