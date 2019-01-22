import React, {Component, Fragment} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import '../App.css';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack'
import PostCard from './PostCard'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import SendButton from '@material-ui/icons/Send'
import CommentCard from './CommentCard'
import CircularProgress from '@material-ui/core/CircularProgress';
import {handlerGetPostComments, handlerAddCommentToPost} from "../action/comments";


class DetailsPost extends Component {
    state = {
        author: '',
        body: '',
    }
    componentDidMount(){
        const {dispatch, post} = this.props
        dispatch(handlerGetPostComments({
            id: post.id ? post.id : this.props.match.params.id,
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const {author, body} = this.state
        const {dispatch, post} = this.props

        dispatch(handlerAddCommentToPost({
            author,
            body,
            parentId : post.id,
            timestamp: Date.now(),
        }))

        this.setState(() => ({
            author: '',
            body: '',
        }))
    }
    render() {
        const {post} = this.props;
        const {id} = post
        if (id === undefined) {
            return <CircularProgress />
        }
        const {category} = this.props.match.params
        return (
            <div style={{padding: '10px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Link to={'/'}>
                            <IconButton  aria-label="Back Button">
                                <BackIcon />
                            </IconButton>
                        </Link>
                        {id && (<PostCard key={id} id={id} categoryUrl={category}/>)}
                        <h2>Adicionar Comentário</h2>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                id="author"
                                name="author"
                                label="Criador"
                                placeholder="Insira o nome do criador"
                                fullWidth
                                margin="normal"
                                variant="filled"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.author}
                                onChange={(e) => {this.setState({author:  e.target.value})}}
                            />
                            <TextField
                                id="body"
                                name="body"
                                label="Corpo da Postagem"
                                multiline
                                rowsMax="4"
                                value={this.state.body}
                                onChange={(e) => {this.setState({body: e.target.value})}}
                                margin="normal"
                                variant="filled"
                                fullWidth
                            />
                            {this.state.author && this.state.body ? (
                                <Button type='submit' variant="contained" color="primary">
                                    Criar
                                    <SendButton />
                                </Button>
                            ) : (
                                <Button disabled variant="contained" color="default">
                                    Criar
                                    <SendButton />
                                </Button>
                            )}

                        </form>
                        <h2>Comentários Criados</h2>
                        {this.props.comments.length === 0 ? (
                            <Fragment>
                                Nenhum comentário para está postagem
                            </Fragment>
                        ) : (
                            <Fragment>
                                {this.props.comments.map((id) => (
                                    <CommentCard key={id} id={id} />
                                ))}
                            </Fragment>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps({posts, comments}, props) {
    const {id} = props.match.params
    const post = posts[id]

    return {
        post: post ? post : [],
        comments:  Object.keys(comments).filter((a) => !comments[a].deleted && comments[a].parentId === id).sort((a, b) => comments[b].voteScore - comments[a].voteScore)
    }
}

export default connect(mapStateToProps)(DetailsPost);
