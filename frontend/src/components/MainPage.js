import React, {Component, Fragment} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import '../App.css';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack'
import PostCard from './PostCard'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import AlarmIcon from '@material-ui/icons/Alarm'
import VoteIcon from '@material-ui/icons/HowToVote'


class MainPage extends Component {
    render() {
        const {category} = this.props.match.params
        return (
            <div style={{padding: '10px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <h2>Postagens Criadas
                            {category && (
                                <Link to={'/'}>
                                    <IconButton  aria-label="Delete">
                                        <BackIcon />
                                    </IconButton>
                                </Link>
                            )}
                            <span style={{marginLeft: '10px'}}>
                                <Link to={'/create/post'} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="default">
                                        Adicionar Postagem
                                        <AddIcon />
                                    </Button>
                                </Link>
                            </span>
                            <Fab onClick={() => {this.props.changePostSort('timestamp')}} style={{marginLeft: '5px'}} variant="extended" color="primary" aria-label="Add">
                                <AlarmIcon />
                                Ord. Tempo
                            </Fab>
                            <Fab onClick={() => {this.props.changePostSort('vote')}} style={{marginLeft: '5px'}} variant="extended" color="primary" aria-label="Add">
                                <VoteIcon />
                                Ord. Votação
                            </Fab>
                        </h2>
                        {this.props.postsIds.length === 0 ? (
                            <Fragment>
                                Nenhum post para está categoria
                            </Fragment>
                        ) : (
                            <Fragment>
                                {this.props.postsIds.map((id) => (
                                    <PostCard key={id} id={id} categoryUrl={this.props.categoryUrl}/>
                                ))}
                            </Fragment>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps({posts}, props) {
    const {category} = props.match.params
    const {isVoteSort, isTimeSort} = props
    let finalPost
    if(category){
        if(isVoteSort){
            finalPost = Object.keys(posts).filter((a) => posts[a].category === category && !posts[a].deleted).sort((a, b) => posts[b].voteScore - posts[a].voteScore)
        }
        if(isTimeSort){
            finalPost = Object.keys(posts).filter((a) => posts[a].category === category && !posts[a].deleted).sort((a, b) => posts[b].timestamp - posts[a].timestamp)
        }
    } else {
        if(isVoteSort){
            finalPost = Object.keys(posts).filter((a) => !posts[a].deleted).sort((a, b) => posts[b].voteScore - posts[a].voteScore)
        }
        if(isTimeSort){
            finalPost = Object.keys(posts).filter((a) => !posts[a].deleted).sort((a, b) => posts[b].timestamp - posts[a].timestamp)
        }
    }
    return {
        categoryUrl: category,
        postsIds: finalPost
    }
}

export default connect(mapStateToProps)(MainPage);
