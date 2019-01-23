import React, {Component, Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
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
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'


class MainPage extends Component {
    state = {
        category: 'all'
    }
    handleChangeSelect = (e) => {
        const text = e.target.value
        if(text === 'all'){
            this.props.history.push(`/`)
        }else{
            this.props.history.push(`/${text}`)
        }
        this.setState(() => ({
            category: text
        }))
    }
    handleBackButton = () => {
        this.props.history.push(`/`)
        this.setState(() => ({
            category: 'all'
        }))
    }
    render() {
        const {category} = this.props.match.params
        const {categories} = this.props.categories
        let finalCats = [];
        if(categories){
            finalCats = categories
        }
        return (
            <div style={{padding: '10px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <h2>Postagens Criadas
                            {category && (
                                <IconButton onClick={this.handleBackButton}  aria-label="Delete">
                                    <BackIcon />
                                </IconButton>
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
                        <div>
                            <TextField
                                id="filled-select-currency"
                                select
                                label="Listar por Categoria"
                                fullWidth
                                value={this.state.category}
                                onChange={this.handleChangeSelect}
                                margin="normal"
                                variant="filled"
                            >
                                <MenuItem key={'all'} value={'all'}>
                                    Mostrar Todos
                                </MenuItem>
                                {finalCats.map(option => (
                                    <MenuItem key={option.path} value={option.path}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        {this.props.postsIds.length === 0 ? (
                            <Fragment>
                                <h3>Nenhum post para está categoria</h3>
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

function mapStateToProps({posts, categories}, props) {
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
        postsIds: finalPost,
        categories
    }
}

export default withRouter(connect(mapStateToProps)(MainPage));
