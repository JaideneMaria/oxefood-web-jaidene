import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Modal, Header, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEmpresa() {

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

        axios.get("http://localhost:8080/api/empresa")
            .then((response) => {
                setLista(response.data)
            })
    }
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/empresa/' + idRemover)
            .then((response) => {

                console.log('Empresa removido com sucesso.')

                axios.get("http://localhost:8080/api/empresa")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um empresa.')
            })
        setOpenModal(false)
    }





    return (
        <div>
            <MenuSistema tela={'empresa'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Empresa </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-empresa'
                        />

                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Site</Table.HeaderCell>
                                    <Table.HeaderCell>CNPJ</Table.HeaderCell>
                                    <Table.HeaderCell>Incrição Estadual</Table.HeaderCell>
                                    <Table.HeaderCell>Nome Empresarial</Table.HeaderCell>
                                    <Table.HeaderCell>Nome Fantasia</Table.HeaderCell>
                                    <Table.HeaderCell>Fone</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Alternativo</Table.HeaderCell>
                                    <Table.HeaderCell>Data Cadastro Empresa</Table.HeaderCell>
                                    <Table.HeaderCell>Ativo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(empresa => (

                                    <Table.Row key={empresa.id}>
                                        <Table.Cell>{empresa.site}</Table.Cell>
                                        <Table.Cell>{empresa.cnpj}</Table.Cell>
                                        <Table.Cell>{empresa.inscricaoEstadual}</Table.Cell>
                                        <Table.Cell>{empresa.nomeEmpresarial}</Table.Cell>
                                        <Table.Cell>{empresa.nomeFantasia}</Table.Cell>
                                        <Table.Cell>{empresa.fone}</Table.Cell>
                                        <Table.Cell>{empresa.foneAlternativo}</Table.Cell>
                                        <Table.Cell>{formatarData(empresa.dataEmpresa)}</Table.Cell>
                                        <Table.Cell>{empresa.empresaStatus ? "Sim" : "Não"}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste empresa'
                                                icon>
                                                <Link to="/form-empresa" state={{ id: empresa.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;


                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este empresa'
                                                icon
                                                onClick={e => confirmaRemover(empresa.id)}>
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
