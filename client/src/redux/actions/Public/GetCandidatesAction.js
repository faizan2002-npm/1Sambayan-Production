import { getRequest } from '../../../api/request';
import { loadingCandidates, setCandidates, getCandidatesError } from '../../reducers/Public/GetCandidates';

export const getCandidates = () => {
    return async (dispatch) => {
        try {
            dispatch(loadingCandidates(true));
            const res = await getRequest(`/api/secure/candidate/candidate-list`);
            const response = res.result.data.candidates;
            if (res.result.status === 200) {
                dispatch(setCandidates(response));
                dispatch(loadingCandidates(false));
            }
        } catch (err) {
            dispatch(getCandidatesError(err.message));
        }
    };
};
