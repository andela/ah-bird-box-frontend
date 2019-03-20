import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Button, Form, Header, Segment} from 'semantic-ui-react';
import resetPasswordReducer from '../../reducers/resetPasswordReducer';
import './resetPassword.scss';
import addEmail from '../../actions/resetPasswordActions';

class PasswordReset extends Component {
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.resetPassword.isSent === true) {
            setInterval(() => {
                window.location.assign('/updatepassword');
            }, 1500)
        }
    }

    onChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const email = {
            email: this.state.email
        };
        this.props.addEmail(email);
    }

    render() {
        return (
            <div className="reset-password">
                <Segment>
                <Form onSubmit={this.onSubmit}>
                    <Header textAlign="center" as="h2" color="green"><br/>Reset Password</Header>
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        label='Email'
                        name="email"
                        type="email"
                        placeholder='Enter your email...'
                        required
                        onChange={this.onChange}/>
                    <Button type="submit" fluid content="Send Email" className="ui green button"/>
                    <br/>
                </Form>
            </Segment>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    resetPassword: state.resetPassword
});

export default connect(mapStateToProps, {resetPasswordReducer, addEmail})(PasswordReset);