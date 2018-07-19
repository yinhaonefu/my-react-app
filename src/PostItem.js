import React ,{ Component }from "react";
import './PostItem.css';
import like from './images/like-default.png';//图标作为模块被导入

class PostItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            editing:false,
            post:props.post
        };
        this.handleVote = this.handleVote.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        //父组件更新后，更新PostItem的state
        if(this.state.post !== nextProps.post){
            this.setState({
                post:nextProps.post
            })
        }
    }

    handleVote(){
        this.props.onVote(this.props.post.id);
    }

    handleEditPost(){
        const editing = this.state.editing;
        if(editing){
            this.props.onSave({
                ...this.state.post,
                date:this.getFormatDate()
            })
        }
        this.setState({
            editing:!editing
        })
    }


    getFormatDate(){
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1 + "";
        month = month.length === 1 ? "0" + month : month;
        let day = date.getDate() + "";
        day = day.length === 1 ? "0" + day : day;
        let hour = date.getHours() + "";
        hour = hour.length === 1 ? "0" + hour : hour;
        let minute = date.getMinutes() + "";
        minute = minute.length === 1 ? "0" + minute : minute;
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    handleTitleChange(event){
        const newPost = {...this.state.post,title:event.target.value};
        this.setState({
            post:newPost
        })
    }

    render(){
        const {post} = this.state;
        return(
            <li className="item">
                <div className="title">
                    {
                        this.state.editing
                            ?
                            <form>
                                <textarea value={post.title} onChange={this.handleTitleChange}/>
                            </form>
                            : post.title
                    }
                </div>
                <div>
                    创建人:<span>{post.author}</span>
                </div>
                <div>
                    创建时间:<span>{post.date}</span>
                </div>
                <div className="like">
                    <span>
                        <img alt="vote" src={like} onClick={this.handleVote}/>
                    </span>
                    <span>
                        {post.vote}
                    </span>
                </div>
                <div>
                    <button onClick={this.handleEditPost}>
                        {this.state.editing ? "保存" : "编辑"}
                    </button>
                </div>
            </li>
        )
    }


}

export default PostItem;
