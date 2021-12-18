import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from "react-loader-spinner";
import { PostCard } from '../../../components/Public/PostCard';
import { getPosts } from './../../../redux/actions/Public/GetPostsAction';

export class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("this.props", this.props)
        // this.props.getPosts();
    }

    render() {
        return (
            <>
                {
                    console.log("this.props", this.props)
                }
                {
                    //  this.props.loading ? <>
                    //     <Loader
                    //         type="Puff"
                    //         color="#00BFFF"
                    //         height={100}
                    //         width={100}
                    //         visible={this.props.loading}
                    //     />
                    // </> : (
                    //     this.props.posts.map((item, key) => (
                    //         <PostCard readMore={true} link={`/singlePost/${item._id}`} key={`id_${item._id}_${key}`} heading={item.title} text={item.description} time={item.createdAt} video={item.image} image={false} grid={true} />
                    //     ))
                    // )
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { posts, loading, error } = state.POSTS;
    return {
        posts,
        loading,
        error,
    };
}

const mapDispatchToProps = {
    getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
