import {getRequest} from '../../../api/request';
import {loadingParties,setParties,getPartiesError} from '../../reducers/Public/GetMemberOrganizations';

export const getParties = () => {
    return async (dispatch) => {
        try {
            dispatch(loadingParties(true));
            const res = await getRequest(`/api/secure/party/party-list`);
            const response = res.result.data.parties;
            if (res.result.status === 200) {
                dispatch(setParties(response));
                dispatch(loadingParties(false));
            }
        } catch (err) {
            dispatch(getPartiesError(err.message));
        }
    };
};
