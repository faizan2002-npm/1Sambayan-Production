import {getRequest} from '../../../api/request';
import {loadingConvenors,setConvenors,getConvenorsError} from '../../reducers/Public/GetConvenors';

export const getConvenors = () => {
    return async (dispatch) => {
        try {
            dispatch(loadingConvenors(true));
            const res = await getRequest(`/api/secure/convenor/convenor-list`);
            const response = res.result.data.convenors;
            if (res.result.status === 200) {
                dispatch(setConvenors(response));
                dispatch(loadingConvenors(false));
            }
        } catch (err) {
            dispatch(getConvenorsError(err.message));
        }
    };
};
