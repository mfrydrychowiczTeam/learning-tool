import {
    StyledButtonGoogle,
    StyledForm,
    StyledTextField,
    StyledLink,
    StyledButton,
    StyledParagraph,
    StyledFormControlLabel,
    StyledError,
    StyledCheckbox
} from './styles';
import React, { FormEvent, useEffect, ReactElement } from 'react';
import { css } from '@emotion/react';
import { Grid } from './styles';
import { Search } from '@trejgun/material-ui-icons-google';
import { Container } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

interface FormProps {
    isregister?: boolean;
    onUsernameChange?: (e: string) => void;
    onEmailChange: (e: string) => void;
    onPasswordChange: (e: string) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    error?: any;
}

interface IFormInput {
    usernameInput: string;
    emailInput: string;
    passwordInput: string;
    termsInput: string;
}

const Form = ({
    error,
    isregister,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
    onSubmit
}: FormProps): ReactElement => {
    const { handleSubmit, control, errors, watch } = useForm<IFormInput>();
    const emailWatch: string = watch(`emailInput`);
    const usernameWatch: string = watch(`usernameInput`);
    const passwordWatch: string = watch(`passwordInput`);

    const passwordMatching = (value: string) => {
        if (isregister) {
            return (
                value.match(/^(?=.*[a-zżźćńółęąś])(?=.*[A-ZŻŹĆĄŚĘŁÓŃ])(?=.*\d)(?=.*[!@#$%^&*()\-__+.]).{8,1024}$/) || ''
            );
        } else {
            return true;
        }
    };

    useEffect(() => {
        onEmailChange(emailWatch);
    }, [emailWatch]);

    useEffect(() => {
        onPasswordChange(passwordWatch);
    }, [passwordWatch]);

    useEffect(() => {
        if (onUsernameChange) onUsernameChange(usernameWatch);
    }, [usernameWatch]);

    return (
        <>
            <Container maxWidth="sm">
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    spacing={1}
                    mt={4}
                >
                    <StyledButtonGoogle onClick={() => window.open('/api/google', '_self')} variant="outlined">
                        <Search
                            css={css`
                                margin-right: 10px;
                            `}
                        />
                        Kontynuuj przez Google
                    </StyledButtonGoogle>
                    <p css={StyledParagraph}>LUB</p>
                    <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                        <Controller
                            render={(props) => (
                                <StyledTextField
                                    {...props}
                                    isdisplay={isregister?.toString()}
                                    className="test"
                                    size="small"
                                    variant="outlined"
                                    placeholder="Nazwa użytkownika/użytkowniczki *"
                                />
                            )}
                            name="usernameInput"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: {
                                    value: isregister || false,
                                    message: 'Nazwa użytkownika/czki jest wymagana'
                                },
                                minLength: {
                                    value: 2,
                                    message: 'Nazwa użytkownika/czki jest za krótka'
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'Nazwa użytkownika/czki jest za długa'
                                }
                            }}
                        />
                        {errors.usernameInput && <StyledError>{errors.usernameInput.message}</StyledError>}
                        <Controller
                            render={(props) => (
                                <StyledTextField {...props} size="small" placeholder="Email *" variant="outlined" />
                            )}
                            control={control}
                            name="emailInput"
                            defaultValue=""
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Email jest wymagany'
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Wprowadzony email jest niepoprawny'
                                }
                            }}
                        />
                        {errors.emailInput && <StyledError>{errors.emailInput.message}</StyledError>}
                        <Controller
                            render={(props) => (
                                <StyledTextField
                                    {...props}
                                    size="small"
                                    variant="outlined"
                                    placeholder="Hasło *"
                                    type="password"
                                />
                            )}
                            name="passwordInput"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Hasło jest wymagane'
                                },
                                validate: passwordMatching
                            }}
                            defaultValue=""
                        />
                        {errors.passwordInput && <StyledError>{errors.passwordInput.message}</StyledError>}
                        {errors.passwordInput && errors.passwordInput.type === 'validate' && (
                            <StyledError>
                                Hasło powinno składać się z min. 8 znaków, zawierać duże i małe litery, liczbę oraz znak
                                specjalny
                            </StyledError>
                        )}
                        <StyledFormControlLabel
                            control={
                                <Controller
                                    defaultValue={false}
                                    name="termsInput"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: isregister || false,
                                            message: 'Akceptacja warunków jest wymagana'
                                        }
                                    }}
                                    render={(props) => <StyledCheckbox {...props} color="primary" />}
                                />
                            }
                            isdisplay={isregister?.toString()}
                            label="Akceptuję warunki korzystania i politykę prywatności FiszQI"
                        />
                        {errors.termsInput && <StyledError>{errors.termsInput.message}</StyledError>}
                        {error?.server && <StyledError>{error?.server.message}</StyledError>}
                        <StyledButton type="submit" variant="contained" color="primary">
                            {isregister ? `ZAREJESTRUJ` : 'ZALOGUJ SIĘ'}
                        </StyledButton>
                    </StyledForm>
                    <StyledLink to={isregister ? '/logowanie' : '/rejestracja'}>
                        {isregister ? `Masz już konto? Zaloguj się` : `Nie masz konta? Zarejestruj się`}
                    </StyledLink>
                </Grid>
            </Container>
        </>
    );
};

export default Form;
