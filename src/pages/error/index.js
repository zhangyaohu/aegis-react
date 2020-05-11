import React, { Component, Fragment, useState } from 'react';
import './error.less'

function Error404() {
	return <Fragment>
		<div className='error-wrapper'>
			<div className='error-main'>
				<div style={{width: '200px',height: '200px'}}>
					<svg viewBox="0 0 100 100">
						<path
							d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
							fill="none"
							stroke="#e5e9f2"
							strokeWidth="5">
							></path>
						<path
							d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
							fill="none"
							stroke="#20a0ff"
							stroke-linecap="round"
							className="my-svg-path"
							transform="rotate(90,50,50)"
							strokeWidth="5">
						</path>
						<text className='des'  x="20" y="55" fill="red">Sorry 404</text>
					</svg>
				</div>
			</div>
		</div>
	</Fragment>
}

export default Error404;