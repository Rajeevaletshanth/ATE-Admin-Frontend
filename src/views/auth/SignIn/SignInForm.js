import React, { useState } from 'react'
import { Input, Button, Checkbox, FormItem, FormContainer, Alert, Switcher  } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'

const validationSchema = Yup.object().shape({
	email: Yup.string().required('Please enter your user name'),
	password: Yup.string().required('Please enter your password'),
	rememberMe: Yup.bool()
})

const SignInForm = props => {

	const [isAdmin, setAdmin] = useState(false)

	const onSwitcherToggle = (val) => {
        setAdmin(val)
    }

	const { 
		disableSubmit = false, 
		className, 
		forgotPasswordUrl = '/forgot-password',
		signUpUrl = '/sign-up',
	} = props

	const [message, setMessage] = useTimeOutMessage()

	const { signIn } = useAuth()

	const onSignIn = async (values, setSubmitting) => {
		const { email, password, rememberMe } = values
		setSubmitting(true)
		
		const result = await signIn({ email, password, signedIn: rememberMe, isSuperadmin: isAdmin })

		if (result.status === 'failed') {
			setMessage(result.message)
		}

		setSubmitting(false)
	}

	return (
		<div className={className}>
			<div className="mb-8">
				<div class="flex justify-between items-center">
					<h3 className="mb-1">{isAdmin? "Admin Login" : "Restaurant Login"} </h3>
					<Switcher checkedContent="Admin" unCheckedContent="Admin" onChange={onSwitcherToggle} />
				</div>
				<p>Please enter your credentials to sign in!</p>
			</div>
			{message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>}
			<Formik
				initialValues={{
					email: '', 
					password: '', 
					rememberMe: false 
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if(!disableSubmit) {
						onSignIn(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({touched, errors, isSubmitting}) => (
					<Form>
						<FormContainer>
							<FormItem
								label="User Name"
								invalid={errors.email && touched.email}
								errorMessage={errors.email}
							>
								<Field 
									type="text" 
									autoComplete="off" 
									name="email" 
									placeholder="User Name" 
									component={Input} 
								/>
							</FormItem>
							<FormItem
								label="Password"
								invalid={errors.password && touched.password}
								errorMessage={errors.password}
							>
								<Field
									autoComplete="off" 
									name="password" 
									placeholder="Password" 
									component={PasswordInput} 
								/>
							</FormItem>
							<div className="flex justify-between mb-6">
								<Field className="mb-0" name="rememberMe" component={Checkbox}  children="Remember Me" />
								
								<ActionLink to={forgotPasswordUrl} hidden={isAdmin?true:false}>
									Forgot Password?
								</ActionLink>
							</div>
							<Button block loading={isSubmitting} variant="solid" type="submit">
								{ isSubmitting ? 'Signing in...' : 'Sign In' }
							</Button>
							<div className="mt-4 text-center" hidden={isAdmin?true:false}>
								<span>Don't have an account yet? </span>
								<ActionLink to={signUpUrl}>
									Sign up
								</ActionLink>
							</div>
							
							
						</FormContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default SignInForm