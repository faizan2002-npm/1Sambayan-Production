import {getRequest} from '../../../api/request';
import {loadingPosts,setPosts,getPostsError} from '../../reducers/Public/GetPosts';

export const getPosts = () => {
    return async (dispatch) => {
        try {
            dispatch(loadingPosts(true));
            const res = await getRequest(`/api/secure/post/post-list`);
            const response = res.result.data.posts;
            if (res.result.status === 200) {
                dispatch(setPosts(response));
                dispatch(loadingPosts(false));
            }
        } catch (err) {
            dispatch(getPostsError(err.message));
        }
    };
};
