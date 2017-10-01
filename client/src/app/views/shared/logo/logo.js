import { h, Component } from 'preact';

import style from './logo.scss';

// Notice me file-loader (●´ω｀●)
import '../../../../assets/img/logo.svg';

export default class Logo extends Component {
    render() {
        return (
            <div class={ `logo ${this.props.customClass || '' }` }>
                <img src='../../../../assets/img/logo.svg' alt="Nethloader Logo" />
            </div>
        );
    }
}
