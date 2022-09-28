import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FormContainer = ({ children, xs = 12, md = 6, className }) => {
	return (
		<Container className={className}>
			<Row className='justify-content-md-center form-row'>
				<Col xs={xs} md={md} className='form-col'>
					{children}
				</Col>
			</Row>
		</Container>
	);
};

export default FormContainer;
