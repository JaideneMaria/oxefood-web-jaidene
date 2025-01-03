import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Modal, Header, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListCategoriaProduto() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/categoriaproduto")
            .then((response) => {
                setLista(response.data)
            })
    }
   
    async function remover() {

        await axios.delete('http://localhost:8080/api/categoriaproduto/' + idRemover)
            .then((response) => {

                console.log('Categoria removida com sucesso.')

                axios.get("http://localhost:8080/api/categoriaproduto")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover a categoria.')
            })
        setOpenModal(false)
    }





    return (
        <div>
            <MenuSistema tela={'categoriaProduto'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Categoria de Produto </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-categoriaproduto'
                        />

                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Descricao</Table.HeaderCell>
                                    
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(categoriaProduto => (

                                    <Table.Row key={categoriaProduto.id}>
                                        <Table.Cell>{categoriaProduto.descricao}</Table.Cell>
                                        
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados desta categoria'
                                                icon>
                                                <Link to="/form-categoriaProduto" state={{ id: categoriaProduto.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;


                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover esta categoria'
                                                icon
                                                onClick={e => confirmaRemover(categoriaProduto.id)}>
                                                <Icon name='trash' />
                                            </Button>


                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}