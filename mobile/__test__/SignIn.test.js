import React from 'react';
import {
    render,
    screen,
    fireEvent
} from '@testing-library/react-native';
import Navigation from '../src/navigation';
import ForgotPasswordScreen from '../src/screens/ForgotPasswordScreeen';

describe('Testing Navigation to Sign Up Screen', () => {
    test('clicking on one item takes you to the details screen', async () => {
        const component = ( <
            Navigation / >
        );

        render(component);
        const toClick = await screen.findByText(`Don't have an account? Sign up!`);

        expect(toClick).toBeTruthy();

        fireEvent(toClick, 'press');
        const newHeader = await screen.findByText('Create an Account!');

        expect(newHeader).toBeTruthy();
    });
});

describe("Testing 'Forgot password' navigation", () => {
    test("clicking 'Forgot password?' button navigates to 'Forgot your password?' screen", async () => {
        const component = ( <
            Navigation / >
        );

        render(component);
        const forgotButton = await screen.findByText('Forgot Password?');

        expect(forgotButton).toBeTruthy();

        fireEvent(forgotButton, 'press');
        const newHeader = await screen.findByText('Forgot your password?');

        expect(newHeader).toBeTruthy();
    });

    test("clicking 'Back to Sign In' button navigates to Sign In screen", async () => {
        const component = ( <
            Navigation /
            >
        );

        render(component);
        const forgotButton = await screen.findByText('Forgot Password?');
        fireEvent(forgotButton, 'press')

        const backToSignInButton = await screen.findByText('Back to Sign In');

        expect(backToSignInButton).toBeTruthy();

        fireEvent(backToSignInButton, 'press');
        const signInButton = await screen.findByText('Sign In');

        expect(signInButton).toBeTruthy();
    })
});