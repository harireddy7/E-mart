import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getUserDetails } from '../store/actions/actionCreators/userActions';
import { getLoggedInUser } from '../utils';

const useLoadUser = () => {
    const { data: userInfo } = useSelector((store) => store.user);
	const dispatch = useDispatch();
    const history = useHistory();
	const location = useLocation();
	const _user = getLoggedInUser();

	React.useEffect(() => {
		// console.log({ userInfo });

		if (!userInfo && _user && _user._id) {
			dispatch(getUserDetails(_user._id));
		} else if (!userInfo && !_user) {
			history.push(`/login?redirect=${location.pathname.split('/')[1]}`);
		}
	}, [userInfo]);

	return userInfo;
};

export default useLoadUser;

/*

    check user in store
        if yes return;
        else
            check for token & user in localstorage
                if exist
                    call getUserDetails to fetch user by id from
                else
                    send user to /login page


*/
