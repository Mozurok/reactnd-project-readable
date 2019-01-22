import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import RemoveIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {formatDate} from "../utils/helpers";
import {handlerDeleteComment, handlerAddCommentVote, handlerEditComment} from "../action/comments";

class CommentCard extends Component {
    state = {
        edit: false,
    }
    handleVote = (e, voteOption) => {
        e.preventDefault()
        const {dispatch, comment} = this.props
        dispatch(handlerAddCommentVote({
            id: comment.id,
            option: voteOption,
        }))
    }

    handleRemoveComment = (e) => {
        e.preventDefault()
        const {dispatch, comment} = this.props
        dispatch(handlerDeleteComment(comment.id, comment.parentId))
    }

    editComment = () => {
        const {comment} = this.props
        this.setState({
            edit: true,
            body: comment.body,
        });
    }

    handleEditComment = () => {
        const {dispatch, comment} = this.props
        dispatch(handlerEditComment(comment.id, this.state.body, Date.now()))
        this.setState({
            edit: false,
        })
    }

    render() {
        const {comment} = this.props;

        if (comment === undefined) {
            return <p>Ops...! Não conseguimos encontrar esse comentario</p>
        }

        // author: "thingone"
        // body: "Comments. Are. Cool."
        // deleted: false
        // id: "8tu4bsun805n8un48ve89"
        // parentDeleted: false
        // parentId: "8xf0y6ziyjabvozdd253nd"
        // timestamp: 1469479767190
        // voteScore: -5

        const {author, body, deleted, timestamp, voteScore} = comment


        return (
            <div style={{paddingTop: '10px'}}>
                {!deleted && (
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe">
                                    {author.charAt(0).toUpperCase()}
                                </Avatar>
                            }
                            title={author}
                            subheader={formatDate(timestamp)}
                        />
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
                                <Button variant="contained" color="secondary" onClick={() => {this.setState({edit: false})}}>
                                    Voltar
                                    <ArrowBackIcon />
                                </Button>
                                <Button onClick={this.handleEditComment} style={{marginLeft: '10px'}} variant="contained" color="default">
                                    Salvar
                                    <SendIcon />
                                </Button>
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
                                comentario criador por {author}
                            </Typography>
                        </CardActions>
                        <CardActions disableActionSpacing>
                            <IconButton onClick={(e) => this.handleVote(e, 'upVote')} aria-label="Adicionar Curtida">
                                <ThumbUpAltIcon/>
                            </IconButton>
                            <Typography component="p">
                                {voteScore}
                            </Typography>
                            <IconButton onClick={(e) => this.handleVote(e, 'downVote')} aria-label="Remover Curtida">
                                <ThumbDownAltIcon/>
                            </IconButton>
                            <IconButton aria-label="Editar Comentário" onClick={this.editComment}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton onClick={this.handleRemoveComment} aria-label="Deletar Comentário">
                                <RemoveIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                )}
            </div>
        )
    }
}

function mapStateToProps({comments}, {id}) {
    const comment = comments[id]

    return {
        comment,
    }
}

export default withRouter(connect(mapStateToProps)(CommentCard))