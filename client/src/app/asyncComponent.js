import { h, Component } from 'preact';

// Huge thanks to Hassan Ali on https://hackernoon.com/code-splitting-for-react-router-with-webpack-and-hmr-bb509968e86f

export default (loader, collection) => (
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.Component = null;
            this.state = { Component: AsyncComponent.Component };
        }

        componentWillMount() {
            if (!this.state.Component) {
                loader().then((Component) => {
                    AsyncComponent.Component = Component;

                    this.setState({ Component });
                });
            }
        }

        render() {
            if (this.state.Component) {
                return (
                    <this.state.Component { ...this.props } { ...collection } />
                )
            }

            return null;
        }
    }
);
