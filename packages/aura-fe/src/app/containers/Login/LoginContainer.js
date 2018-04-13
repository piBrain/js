import React from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import AuraPrompt from '../../components/AuraPrompt/AuraPrompt.js';
import { Redirect } from 'react-router-dom'
import { Errors, Field, Form, Control, actions } from 'react-redux-form';
import getConfigs from '../../../../config'
const { apiUrl } = getConfigs()

const auraTheme = {
    auraBlue: 'rgb(103,151,208)',
    gray: '#CCC',
    cloudy:'#F5F5F5',
    lightGray: '#a1a1a1',
    darkGray:'#757575',
    black: '#262626'
};

class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this)
    }

    toggleSpeech(e) {
        e.preventDefault();
    }
    async handleLogin(vals) {
        var email = vals.email.trim();
        var password = vals.password;
        if (!email || !password) {
            return;
        }
        const askServerForSession = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        }).then((res) => res.json())
        if(!askServerForSession.err) {
            const token = askServerForSession.data.token
            this.props.toggleLogin()
            this.props.setSessionToken(token)
        }
        else {
            this.props.setFormErrors('forms.login', { badCreds: true })
        }
    }

    loginPage(props) {

        const Login = styled.div`
      background-color: ${props => props.theme.cloudy };
      width: 100%;
      height: 100%;
      overflow:hidden;
      font-family: 'Noto Sans', sans-serif;
    `;

        const LoginForm = styled.div`
      position: absolute;
      left: 50%;
      top: 60%;
      transform: translate(-50%, -50%);
      width: 30%;
      height: 20%;
    `
        const StyledForm = styled(Form)`
      input {
        width: 80%;
        padding: 12px 20px;
        margin: 8px 50px;
        border-radius: 5px;
        box-sizing: border-box;
        border: 3px solid #d8d6e2;
        -webkit-transition: 0.5s;
        font: 12px 'PT Mono', monospace;
        transition: 0.5s;
        outline: none;
      }

      input[type=submit] {
        background: ${props => props.theme.auraBlue};
        border: none;
        cursor:pointer;
      }

      input[type=submit]:hover {
        background: ${props => props.theme.black};
        color: white;
      }

      input[type=email]:focus, input[type=password]:focus {
        border: 3px solid #555;
      }
      .forgot-password {
        font-family: "PT Mono", monospace;
        font-size: 12px;
        margin: 20px 50px;
        color: #222;

        span {
          border-bottom: 1px solid #222;
          padding-bottom: 2px;
          cursor:pointer;
        }
      }
    `

        const AuraImage = styled.div`
      position: absolute;
      width: 500px;
      height: 500px;
      left: 49%;
      top: 20%;
      transform: translate(-50%, -49%);
      border-radius: 40px;
      margin-top: 2.5%;
      background-size: cover;
      background-position: center;
      background-image: url('${require('../../../assets/aura.png')}');
    `;
        return (
            <ThemeProvider theme={auraTheme}>
                <Login className="dashboard-container">
                    <AuraImage />
                    <LoginForm>
                        <StyledForm model="forms.login" className="login-form" onSubmit={this.handleLogin} >
                            <Errors className="form-errors" model='forms.login' show='touched'
                            messages={{
                                badCreds: 'Cannot login with credentials provided.'
                            }}
                            />
                            <Control.text type="email" model='.email' className='login-input-email' placeholder='john.doe@example.com'/>
                            <br></br>
                            <Control.text model='.password' type='password' className='login-input-password' placeholder='password'/>
                            <p className="forgot-password">Forgot your passsword? Click <span className="link">here</span>!</p>
                            <input className="submit-btn" type="submit" value="Login" />
                        </StyledForm>
                    </LoginForm>
                </Login>
            </ThemeProvider>
        );
    }

    render(props) {
        if(this.props.loggedIn && this.props.token) {
            return ( <Redirect to='/' push/> )
        } else {
            return this.loginPage(props)
        }
    }
}

export default withTheme(LoginContainer);
