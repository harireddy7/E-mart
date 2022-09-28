import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';

import useLoadUser from '../../hooks/useLoadUser';
import { getShippingAddressAction } from '../../store/actions/actionCreators/userActions';
import ShippingCard from './ShippingCard';
import ShippingForm from './ShippingForm';

const ShippingScreen = ({ history }) => {
	const userInfo = useLoadUser();
	const { shippingAddress } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!shippingAddress) {
			dispatch(getShippingAddressAction());
		}
	}, [])

	const [address, setAddress] = useState(shippingAddress?.address);
	const [city, setCity] = useState(shippingAddress?.city);
	const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
	const [country, setCountry] = useState(shippingAddress?.country);

	const submitHandler = (e) => {
		e.preventDefault();
		const _address = { address, city, postalCode, country };
		console.log(_address);
		// dispatch(saveShippingAddressAction(_address, history));
	};

	if (!shippingAddress) return <Loader />;

	return (
		<Row>
			{shippingAddress.map(address => <ShippingCard key={address._id} address={address} />)}
		</Row>
	);

	// return <ShippingForm />
};

export default ShippingScreen;
