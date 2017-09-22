import { h, Component } from 'preact';

import Test from './test';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>Nethloader</h1>
                <Test />
            </div>
        );
    }
}
