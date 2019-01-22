import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import RemoveIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import CommentIcon from '@material-ui/icons/Comment'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {formatDate} from "../utils/helpers";
import {handlerAddPostVote, handlerDeletePost, handlerEditPost} from "../action/posts";

class PostCard extends Component {
    state = {
        edit: false,
        body: '',
        title: '',

    }
    handleVote = (e, voteOption) => {
        e.preventDefault()
        const {dispatch, post} = this.props
        dispatch(handlerAddPostVote({
            id: post.id,
            option : voteOption,
        }))
    }

    handleRemovePost = (e) => {
        e.preventDefault()
        const {dispatch, post} = this.props
        dispatch(handlerDeletePost(post.id))
    }
    editPost = () => {
        const {post} = this.props
        this.setState({
            edit: true,
            body: post.body,
            title: post.title,
        });
    }
    handleEditPost = () => {
        const {dispatch, post} = this.props
        dispatch(handlerEditPost(post.id, this.state.body, this.state.title))
        this.setState({
            edit: false,
        })
    }
    render() {
        const {post, categoryUrl} = this.props;
        if (post === undefined) {
            return <p>Ops...! Não conseguimos encontrar essa postagem</p>
        }
        // author: "thingtwo"
        // body: "Everyone says so after all."
        // category: "react"
        // commentCount: 2
        // deleted: false
        // id: "8xf0y6ziyjabvozdd253nd"
        // timestamp: 1467166872634
        // title: "Udacity is the best place to learn React"
        // voteScore: 6

        const {author, body, category, commentCount, deleted, timestamp, title, id, voteScore} = post

        if(categoryUrl && category !== categoryUrl){
            return null
        }

        return (
            <div style={{paddingTop: '10px'}}>
                {!deleted && (
                    <Card>
                        {this.state.edit ? (
                            <CardContent>
                                <TextField
                                    id="title"
                                    name="title"
                                    label="Título"
                                    placeholder="Insira o Titulo"
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.title}
                                    onChange={(e) => {this.setState({title:  e.target.value})}}
                                />
                            </CardContent>
                        ) : (
                            <Link to={`/${category}/${id}`} style={{ textDecoration: 'none' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe">
                                            {author.charAt(0).toUpperCase()}
                                        </Avatar>
                                    }
                                    title={title}
                                    subheader={formatDate(timestamp)}
                                />
                            </Link>
                        )}
                        {this.state.edit ? (
                            <CardContent>
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
                            </CardContent>
                        ) : (
                            <CardContent>
                                <Typography component="p">
                                    {body}
                                </Typography>
                            </CardContent>
                        )}
                        <CardActions disableActionSpacing>
                            <Typography component="p">
                                postagem criador por {author} na categoria <Link to={`/${category}`}>{category}</Link>
                            </Typography>
                        </CardActions>
                        <CardActions disableActionSpacing>
                        {this.state.edit ? (
                            <Fragment>
                                <Button variant="contained" color="secondary" onClick={() => {this.setState({edit: false})}}>
                                    Voltar
                                    <ArrowBackIcon />
                                </Button>
                                <Button onClick={this.handleEditPost} style={{marginLeft: '10px'}} variant="contained" color="default">
                                    Salvar
                                    <SendIcon />
                                </Button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <IconButton onClick={(e) => this.handleVote(e, 'upVote')} aria-label="Adicionar Curtida">
                                    <ThumbUpAltIcon />
                                </IconButton>
                                <Typography component="p">
                                    {voteScore}
                                </Typography>
                                <IconButton onClick={(e) => this.handleVote(e, 'downVote')} aria-label="Remover Curtida">
                                    <ThumbDownAltIcon />
                                </IconButton>
                                <Link to={`/${category}/${id}`} style={{ textDecoration: 'none' }}>
                                    <IconButton aria-label="Quantidade de Comentários">
                                        <CommentIcon />
                                    </IconButton>
                                </Link>
                                <Typography component="p">
                                    {commentCount}
                                </Typography>
                                <IconButton aria-label="Editar Postagem" onClick={this.editPost}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={this.handleRemovePost} aria-label="Deletar Postagem">
                                    <RemoveIcon />
                                </IconButton>
                            </Fragment>
                        )}
                        </CardActions>
                    </Card>
                )}
            </div>
        )
    }
}

function mapStateToProps({posts}, {id, categoryUrl}) {
    const post = posts[id]

    return {
        post,
        categoryUrl
    }
}

export default withRouter(connect(mapStateToProps)(PostCard))