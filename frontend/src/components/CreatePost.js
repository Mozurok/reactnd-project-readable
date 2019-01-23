import React, {Component} from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendButton from '@material-ui/icons/Send'
import {handlerAddPost} from "../action/posts";

class CreatePost extends Component {
    state = {
        title: '',
        author: '',
        body: '',
        category: ''
    }
    handleChangeSelect = (e) => {
        const text = e.target.value
        this.setState(() => ({
            category: text
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const {author, body, category, title} = this.state
        const {dispatch, id} = this.props

        dispatch(handlerAddPost(author, body, category, title))

        this.setState(() => ({
            title: '',
            author: '',
            body: '',
            category: '',
            toHome: id ? false : true,
        }))
    }

    render() {
        const { toHome } = this.state
        const {categories} = this.props.categories
        let finalCats = [];
        if(categories){
            finalCats = categories
        }
        if (toHome === true) {
            return <Redirect to='/' />
        }
        return (
            <div style={{padding: '10px'}}>
                <h2>Adicionar Postagem</h2>
                <form onSubmit={this.handleSubmit}>
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
                        id="filled-select-currency"
                        select
                        label="Selecione a Categoria"
                        fullWidth
                        value={this.state.category}
                        onChange={this.handleChangeSelect}
                        margin="normal"
                        variant="filled"
                    >
                        {finalCats.map(option => (
                            <MenuItem key={option.path} value={option.path}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
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
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="secondary">
                            Voltar
                            <ArrowBackIcon />
                        </Button>
                    </Link>
                    {this.state.title && this.state.category && this.state.author && this.state.body ? (
                        <Button type='submit' style={{marginLeft: '10px'}} variant="contained" color="primary">
                            Criar
                            <SendButton />
                        </Button>
                    ) : (
                        <Button disabled style={{marginLeft: '10px'}} variant="contained" color="default">
                            Criar
                            <SendButton />
                        </Button>
                    )}

                </form>
            </div>
        )
    }
}

function mapStateToProps({categories}) {
    return {
        categories
    }
}

export default connect(mapStateToProps)(CreatePost)