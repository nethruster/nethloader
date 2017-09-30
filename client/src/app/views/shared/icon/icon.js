import { h, Component } from 'preact';

import style from './icon.scss';

// Notice me file-loader (●´ω｀●)
import iconsSvg from '../../../../assets/img/icons.svg';

export default class Button extends Component {
    render() {
        const iconStyle = {
          fill: this.props.iconColor
        };

        return (
          <svg style={ iconStyle } viewBox="0 0 24 24"><use xlinkHref={`../../../../assets/img/icons.svg#${ this.props.iconName }`}></use></svg>
        );
    }
}
