import React, {Component} from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {Button, Form, Header, Segment} from 'semantic-ui-react';
import updatePasswordReducer from '../../reducers/resetPasswordReducer';
import './resetPassword.scss';
import updatePass from '../../actions/updatePasswordActions';

class PasswordUpdate extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.updatePassword.isUpdated === true) {
            setInterval(() => {
                window.location.assign('/login');
            }, 2500)
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const userPassword = {
            password: this.state.password,
            confirm_password: this.state.confirm_password,
        };
        const token = this.props.match.params.token;
        const { password } = this.state
        if (this.state.password !== this.state.confirm_password) {
            toastr.error("Your passwords do not match");
        } else if (!password.match(/^(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/)) {
            toastr.error("Password should be at least 8 characters with an uppercase, lowecase, digit and a special character");
        } else {
            this.props.updatePass(userPassword, token);
        }
    }

    render() {
        return (
            <div className="reset-password">
                <Segment>
                <Form onSubmit={this.onSubmit}>
                    <Header textAlign="center" as="h2" color="green"><br/>Update Password</Header>
                    <Form.Input
                        label='Password'
                        name="password"
                        type="password"
                        placeholder='Enter you new password'
                        required
                        onChange={this.onChange}/>
                    <Form.Input
                        label='Confirm Password'
                        name="confirm_password"
                        type="password"
                        placeholder='Enter your new password again'
                        required
                        onChange={this.onChange}/>
                    <Button type="submit" fluid content="Reset" className="ui green button"/>
                    <br/>
                </Form>
            </Segment>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    updatePassword: state.updatePassword
});

export default connect(mapStateToProps, {updatePasswordReducer, updatePass})(PasswordUpdate);