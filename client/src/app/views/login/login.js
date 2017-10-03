import { h, Component } from 'preact';

import LoginForm from './login-form/login-form.js';
import Footer from '../shared/footer/footer.js';

import style from './login.scss';
import paperStyle from '../shared/paper/paper.scss';

export default class Login extends Component {

    render() {
        return (
            <div class={`${ style.login } flex flex-full-center flex-dc`}>
                <div class="paper paper-small paper-shadow-1 flex flex-dc flex-full-center">
                    <h1 class="ta-c">Login</h1>
                    <LoginForm />
                    <div class={`${ style.loginAltLinks } flex flex-cross-center flex-sb`}>
                        <a href="mailto:admin@domain.com" rel="noopener">I forgot my password</a>
                        <a href="mailto:admin@domain.com" rel="noopener">I don't have an account</a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
