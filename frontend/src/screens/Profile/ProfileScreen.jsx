import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';

const ProfileScreen = ({ history }) => {
  const navigateSetting = (route) => {
    history.push(`/profile/${route}`);
  }

	return (
		<>
			<Row>
				<h3>Profile Settings</h3>
			</Row>
			<Row style={{ marginTop: '20px' }}>
				<Col md={6} lg={4} style={{ paddingLeft: '0px', marginTop: '10px' }}>
					<Card className='text-center'>
						<Card.Header>Personal Info</Card.Header>
						<Card.Body style={{ minHeight: '180px' }}>
							<div
								style={{
									maxWidth: '220px',
									margin: '0 auto',
									textAlign: 'left',
									padding: '10px',
								}}
							>
								<div>name: User_One</div>
								<div>email: userone@gmail.com</div>
								<div style={{ margin: '15px 0' }}>
									<Button variant='primary' style={{ padding: '0.25rem 1.5rem' }} onClick={() => navigateSetting('personal-info')}>Update Info</Button>
								</div>
							</div>
						</Card.Body>
						<Card.Footer className='text-muted'>2 days ago</Card.Footer>
					</Card>
				</Col>
				<Col md={6} lg={4} style={{ paddingLeft: '0px', marginTop: '10px' }}>
					<Card className='text-center'>
						<Card.Header>Password</Card.Header>
						<Card.Body style={{ minHeight: '180px' }}>
							<div
								style={{ maxWidth: '220px', margin: '0 auto', padding: '10px' }}
							>
								<div />
								<div>Click on update password to reset to latest one!</div>
								<div style={{ margin: '15px 0' }}>
									<Button variant='primary' style={{ padding: '0.25rem 1.5rem' }} onClick={() => navigateSetting('reset-password')}>Reset Password</Button>
								</div>
							</div>
						</Card.Body>
						<Card.Footer className='text-muted'>2 days ago</Card.Footer>
					</Card>
				</Col>
				<Col md={6} lg={4} style={{ paddingLeft: '0px', marginTop: '10px' }}>
					<Card className='text-center'>
						<Card.Header>Saved Address</Card.Header>
						<Card.Body style={{ minHeight: '180px' }}>
							<div
								style={{ maxWidth: '220px', margin: '0 auto', padding: '10px' }}
							>
								<div />
								<div>View/Update your saved addresses</div>
								<div style={{ margin: '15px 0' }}>
									<Button variant='primary' style={{ padding: '0.25rem 1.5rem' }} onClick={() => navigateSetting('saved-address')}>Update Address</Button>
								</div>
							</div>
						</Card.Body>
						<Card.Footer className='text-muted'>2 days ago</Card.Footer>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProfileScreen;
