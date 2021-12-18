import {getRequest} from '../../../api/request';
import {loadingEvents,setEvents,getEventsError} from '../../reducers/Public/GetEvents';

export const getEvents = () => {
    return async (dispatch) => {
        try {
            dispatch(loadingEvents(true));
            const res = await getRequest(`/api/secure/event/event-list`);
            const response = res.result.data.events;
            if (res.result.status === 200) {
                dispatch(setEvents(response));
                dispatch(loadingEvents(false));
            }
        } catch (err) {
            dispatch(getEventsError(err.message));
        }
    };
};
