import {getRequest} from '../../../api/request';
import {loadingChapters,setChapters,getChaptersError} from '../../reducers/Public/GetChapters';

export const getChapters = () => {
    return async (dispatch) => {
        try {
            dispatch(loadingChapters(true));
            const res = await getRequest(`/api/secure/community/community-list`);
            const response = res.result.data.communities;
            if (res.result.status === 200) {
                dispatch(setChapters(response));
                dispatch(loadingChapters(false));
            }
        } catch (err) {
            dispatch(getChaptersError(err.message));
        }
    };
};
