import React, { cloneElement } from 'react'
import Logo from 'components/template/Logo'
import { APP_NAME } from 'constants/app.constant'

const Cover = ({children, content, ...rest }) => {
	return (
		<div className="grid lg:grid-cols-3 h-full">
			<div 
				className="col-span-2 bg-no-repeat bg-cover py-6 px-16 flex-col justify-between bg-white dark:bg-gray-800 hidden lg:flex"
				style={{backgroundImage: `url('/img/others/auth-cover-bg.jpg')`}}
			>
				<Logo mode="light" />
				<div>
					<h2 className="text-xl text-bold text-white text-center max-w-[700px] mb-4 bg-red-600">Jump start your business with ATE</h2>
					<p className="text-lg text-dark text-center opacity-80 max-w-[700px]">Welcome to the ATE Admin Page! As a restaurant partner, you have access to all the tools and features you need to manage your menu, orders, and deliveries.</p>
				</div>
				<span className="text-dark">Copyright  &copy;  {`${new Date().getFullYear()}`} <span className="font-semibold">{`${APP_NAME}`}</span> </span>
			</div>
			<div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800">
				<div className="xl:min-w-[450px] px-8">
					<div className="mb-8">
						{content}
					</div>
					{children ? cloneElement(children, { ...rest }) : null}
				</div>
			</div>
		</div>
	)
}

export default Cover