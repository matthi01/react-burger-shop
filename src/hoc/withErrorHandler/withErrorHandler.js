import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import AuxHoc from '../AuxHoc';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        // catch any error globally, then show modal window with error message
        // first clear any error when sending a request
        // then catch the error
        // argh... remember to return the requests... F***
        // to keep track of the interceptor instances, store them in their own properties - this allows removal

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            this.resInterceptor = axios.interceptors.response.use(response => response, err => {
                this.setState({error: err});
            });
        }

        //need to remove interceptors when they're no longer needed / prevents memory leaks
        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        clearErrorHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <AuxHoc>
                    <Modal show={this.state.error} modalClosed={this.clearErrorHandler}>
                        <p>Something went wrong.</p>
                        <p>{this.state.error ? this.state.error.message : null}</p>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </AuxHoc>
            )
        }
    }
}

export default withErrorHandler;